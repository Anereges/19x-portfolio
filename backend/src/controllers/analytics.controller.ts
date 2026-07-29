import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../types';

// Make geoip-lite optional with require
let geoip: any;

try {
  geoip = require('geoip-lite');
} catch (error) {
  console.warn(
    'geoip-lite not available, IP geolocation disabled'
  );
}

// ============================================================
// GET VISITOR COUNTRY FROM IP
// ============================================================

const getCountry = (ip: string): string => {
  if (!geoip) return 'Unknown';

  try {
    const geo = geoip.lookup(ip);
    return geo?.country || 'Unknown';
  } catch {
    return 'Unknown';
  }
};

// ============================================================
// DETECT DEVICE
// ============================================================

const detectDevice = (userAgent: string): string => {
  // Detect tablets first because some tablets
  // can also contain "Mobile" or "Android"
  if (/iPad|Tablet/i.test(userAgent)) {
    return 'tablet';
  }

  // Detect mobile devices
  if (/Mobile|Android|iPhone|iPod/i.test(userAgent)) {
    return 'mobile';
  }

  // Default
  return 'desktop';
};

// ============================================================
// DETECT BROWSER
// ============================================================

const detectBrowser = (userAgent: string): string => {
  // Edge User-Agent also contains Chrome,
  // so Edge must be checked first.
  if (/Edg/i.test(userAgent)) {
    return 'Edge';
  }

  if (/OPR|Opera/i.test(userAgent)) {
    return 'Opera';
  }

  if (/Chrome/i.test(userAgent)) {
    return 'Chrome';
  }

  if (/Firefox/i.test(userAgent)) {
    return 'Firefox';
  }

  if (/Safari/i.test(userAgent)) {
    return 'Safari';
  }

  return 'Unknown';
};

// ============================================================
// DETECT OPERATING SYSTEM
// ============================================================

const detectOS = (userAgent: string): string => {
  // Android must be checked before Linux
  // because Android User-Agent often contains Linux.
  if (/Android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'iOS';
  }

  if (/Windows/i.test(userAgent)) {
    return 'Windows';
  }

  if (/Mac OS X/i.test(userAgent)) {
    return 'macOS';
  }

  if (/Linux/i.test(userAgent)) {
    return 'Linux';
  }

  return 'Unknown';
};

// ============================================================
// ANALYTICS CONTROLLER
// ============================================================

export class AnalyticsController {

  // ============================================================
  // TRACK VISITOR
  // POST /api/analytics/track
  // ============================================================

  trackVisitor = asyncHandler(
    async (req: Request, res: Response) => {

      // --------------------------------------------------------
      // Get data sent from frontend
      // --------------------------------------------------------

      const {
        sessionId: bodySessionId,
        source,
        referrer,
        page,
        path
      } = req.body;

      // --------------------------------------------------------
      // Get session ID
      //
      // Priority:
      // 1. Request body
      // 2. Cookie
      // 3. X-Session-Id header
      // --------------------------------------------------------

      const sessionId =
        bodySessionId ||
        req.cookies?.sessionId ||
        (req.headers['x-session-id'] as string);

      // --------------------------------------------------------
      // Get User-Agent
      // --------------------------------------------------------

      const userAgent =
        (req.headers['user-agent'] as string) || '';

      // --------------------------------------------------------
      // Get IP address
      // --------------------------------------------------------

      const forwardedFor =
        req.headers['x-forwarded-for'];

      let ipAddress =
        req.ip ||
        req.socket.remoteAddress ||
        '';

      // If behind Render/Vercel/proxy,
      // use the forwarded IP when available.
      if (forwardedFor) {
        ipAddress = Array.isArray(forwardedFor)
          ? forwardedFor[0]
          : forwardedFor.split(',')[0].trim();
      }

      // --------------------------------------------------------
      // Detect visitor information
      // --------------------------------------------------------

      const device = detectDevice(userAgent);
      const browser = detectBrowser(userAgent);
      const os = detectOS(userAgent);

      // --------------------------------------------------------
      // Find existing visitor
      // --------------------------------------------------------

      let visitor = await prisma.visitor.findUnique({
        where: {
          sessionId: sessionId || ''
        }
      });

      // ========================================================
      // CREATE NEW VISITOR
      // ========================================================

      if (!visitor) {

        const finalSessionId =
          sessionId ||
          `session_${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 11)}`;

        const country = getCountry(ipAddress);

        visitor = await prisma.visitor.create({
          data: {
            sessionId: finalSessionId,

            source:
              source ||
              'direct',

            referrer:
              referrer ||
              '',

            userAgent,

            ipAddress,

            country:
              country ||
              'Unknown',

            device,

            browser,

            os,

            visitCount: 1,

            pagesViewed: 1
          }
        });

      } else {

        // ======================================================
        // UPDATE EXISTING VISITOR
        // ======================================================

        visitor = await prisma.visitor.update({
          where: {
            id: visitor.id
          },

          data: {

            // Update visit statistics
            visitCount: {
              increment: 1
            },

            pagesViewed: {
              increment: 1
            },

            lastVisit: new Date(),

            // Update visitor information
            // This fixes old records that had
            // missing device/browser/OS values.
            userAgent,

            ipAddress,

            device,

            browser,

            os
          }
        });
      }

      // ========================================================
      // CREATE PAGE VIEW
      // ========================================================

      await prisma.pageView.create({
        data: {
          visitorId: visitor.id,

          page:
            page ||
            'unknown',

          path:
            path ||
            '/',

          timestamp: new Date()
        }
      });

      // ========================================================
      // RESPONSE
      // ========================================================

      res.status(200).json({
        success: true,

        data: {
          visitorId: visitor.id
        }
      });
    }
  );

  // ============================================================
  // GET ANALYTICS
  // GET /api/analytics/admin
  // ============================================================

  getAnalytics = asyncHandler(
    async (req: AuthRequest, res: Response) => {

      const {
        period = '30d'
      } = req.query;

      // --------------------------------------------------------
      // Date filter
      // --------------------------------------------------------

      const dateFilter = new Date();

      if (period === '7d') {
        dateFilter.setDate(
          dateFilter.getDate() - 7
        );
      }

      else if (period === '30d') {
        dateFilter.setDate(
          dateFilter.getDate() - 30
        );
      }

      else if (period === '90d') {
        dateFilter.setDate(
          dateFilter.getDate() - 90
        );
      }

      // ========================================================
      // TOTAL STATISTICS
      // ========================================================

      const [
        totalVisitors,
        totalPageViews,
        uniqueVisitors
      ] = await Promise.all([

        // Total visitors
        prisma.visitor.count(),

        // Page views during selected period
        prisma.pageView.count({
          where: {
            timestamp: {
              gte: dateFilter
            }
          }
        }),

        // New unique visitors during selected period
        prisma.visitor.count({
          where: {
            firstVisit: {
              gte: dateFilter
            }
          }
        })

      ]);

      // ========================================================
      // TOP SOURCES
      // ========================================================

      const sources =
        await prisma.visitor.groupBy({

          by: ['source'],

          where: {
            firstVisit: {
              gte: dateFilter
            }
          },

          _count: {
            source: true
          },

          orderBy: {
            _count: {
              source: 'desc'
            }
          }
        });

      // ========================================================
      // TOP PAGES
      // ========================================================

      const pages =
        await prisma.pageView.groupBy({

          by: ['page'],

          where: {
            timestamp: {
              gte: dateFilter
            }
          },

          _count: {
            page: true
          },

          orderBy: {
            _count: {
              page: 'desc'
            }
          }
        });

      // ========================================================
      // DEVICE BREAKDOWN
      // ========================================================

      const devices =
        await prisma.visitor.groupBy({

          by: ['device'],

          where: {
            firstVisit: {
              gte: dateFilter
            }
          },

          _count: {
            device: true
          }
        });

      // ========================================================
      // BROWSER BREAKDOWN
      // ========================================================

      const browsers =
        await prisma.visitor.groupBy({

          by: ['browser'],

          where: {
            firstVisit: {
              gte: dateFilter
            }
          },

          _count: {
            browser: true
          }
        });

      // ========================================================
      // OPERATING SYSTEM BREAKDOWN
      // ========================================================

      const operatingSystems =
        await prisma.visitor.groupBy({

          by: ['os'],

          where: {
            firstVisit: {
              gte: dateFilter
            }
          },

          _count: {
            os: true
          }
        });

      // ========================================================
      // DAILY VISITORS
      //
      // PostgreSQL / Neon compatible
      // ========================================================

      const dailyVisitors =
        await prisma.$queryRaw`
          SELECT
            DATE("timestamp") AS date,
            COUNT(DISTINCT "visitorId") AS visitors
          FROM "page_views"
          WHERE "timestamp" >= NOW() - INTERVAL '7 days'
          GROUP BY DATE("timestamp")
          ORDER BY date ASC
        `;

      // ========================================================
      // RECENT VISITORS
      // ========================================================

      const recentVisitors =
        await prisma.visitor.findMany({

          take: 20,

          orderBy: {
            lastVisit: 'desc'
          },

          include: {

            pageViews: {
              take: 1,

              orderBy: {
                timestamp: 'desc'
              }
            }

          }
        });

      // ========================================================
      // RESPONSE
      // ========================================================

      res.status(200).json({

        success: true,

        data: {

          // ----------------------------------------------------
          // Summary
          // ----------------------------------------------------

          summary: {

            totalVisitors,

            totalPageViews,

            uniqueVisitors,

            bounceRate:
              totalVisitors > 0
                ? Math.round(
                    (
                      (totalVisitors - uniqueVisitors) /
                      totalVisitors
                    ) * 100
                  )
                : 0
          },

          // ----------------------------------------------------
          // Sources
          // ----------------------------------------------------

          sources:
            sources.map(s => ({

              source:
                s.source ||
                'direct',

              count:
                s._count.source

            })),

          // ----------------------------------------------------
          // Pages
          // ----------------------------------------------------

          pages:
            pages.map(p => ({

              page:
                p.page,

              views:
                p._count.page

            })),

          // ----------------------------------------------------
          // Devices
          // ----------------------------------------------------

          devices:
            devices.map(d => ({

              device:
                d.device ||
                'unknown',

              count:
                d._count.device

            })),

          // ----------------------------------------------------
          // Browsers
          // ----------------------------------------------------

          browsers:
            browsers.map(b => ({

              browser:
                b.browser ||
                'unknown',

              count:
                b._count.browser

            })),

          // ----------------------------------------------------
          // Operating Systems
          // ----------------------------------------------------

          operatingSystems:
            operatingSystems.map(o => ({

              os:
                o.os ||
                'unknown',

              count:
                o._count.os

            })),

          // ----------------------------------------------------
          // Daily visitors
          // ----------------------------------------------------

          dailyVisitors,

          // ----------------------------------------------------
          // Recent visitors
          // ----------------------------------------------------

          recentVisitors:
            recentVisitors.map(v => ({

              id:
                v.id,

              source:
                v.source,

              device:
                v.device,

              browser:
                v.browser,

              os:
                v.os,

              country:
                v.country,

              city:
                v.city,

              visitCount:
                v.visitCount,

              lastVisit:
                v.lastVisit,

              page:
                v.pageViews[0]?.page ||
                'unknown',

              path:
                v.pageViews[0]?.path ||
                '/'

            }))

        }

      });
    }
  );

  // ============================================================
  // GET VISITOR SOURCES
  // GET /api/analytics/admin/sources
  // ============================================================

  getSources = asyncHandler(
    async (_req: AuthRequest, res: Response) => {

      const sources =
        await prisma.visitor.groupBy({

          by: ['source'],

          _count: {
            source: true
          },

          _sum: {
            visitCount: true
          }

        });

      res.status(200).json({

        success: true,

        data: sources

      });
    }
  );
}

// ============================================================
// EXPORT CONTROLLER
// ============================================================

export default new AnalyticsController();