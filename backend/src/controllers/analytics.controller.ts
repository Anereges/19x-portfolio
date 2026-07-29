import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../types';

// Make geoip-lite optional with require
let geoip: any;
try {
  geoip = require('geoip-lite');
} catch (error) {
  console.warn('geoip-lite not available, IP geolocation disabled');
}

// Get visitor country from IP
const getCountry = (ip: string) => {
  if (!geoip) return 'Unknown';
  try {
    const geo = geoip.lookup(ip);
    return geo?.country || 'Unknown';
  } catch {
    return 'Unknown';
  }
};

export class AnalyticsController {
  // Track a visitor
  trackVisitor = asyncHandler(async (req: Request, res: Response) => {
    const { source, referrer, page, path } = req.body;
    const sessionId = req.cookies?.sessionId || req.headers['x-session-id'] as string;
    
    const userAgent = req.headers['user-agent'] || '';
    const ipAddress = req.ip || req.socket.remoteAddress || '';
    
    // Detect device type
    let device = 'desktop';
    if (userAgent.match(/Mobile|Android|iPhone|iPad/i)) {
      device = 'mobile';
    } else if (userAgent.match(/Tablet|iPad/i)) {
      device = 'tablet';
    }
    
    // Detect browser
    let browser = 'Unknown';
    if (userAgent.match(/Chrome/i)) browser = 'Chrome';
    else if (userAgent.match(/Firefox/i)) browser = 'Firefox';
    else if (userAgent.match(/Safari/i)) browser = 'Safari';
    else if (userAgent.match(/Edge/i)) browser = 'Edge';
    else if (userAgent.match(/Opera/i)) browser = 'Opera';
    
    // Detect OS
    let os = 'Unknown';
    if (userAgent.match(/Windows/i)) os = 'Windows';
    else if (userAgent.match(/Mac OS/i)) os = 'macOS';
    else if (userAgent.match(/Linux/i)) os = 'Linux';
    else if (userAgent.match(/Android/i)) os = 'Android';
    else if (userAgent.match(/iOS|iPhone|iPad/i)) os = 'iOS';
    
    // Get or create visitor
    let visitor = await prisma.visitor.findUnique({
      where: { sessionId: sessionId || '' }
    });
    
    if (!visitor) {
      const country = getCountry(ipAddress);
      
      visitor = await prisma.visitor.create({
        data: {
          sessionId: sessionId || `session_${Date.now()}_${Math.random()}`,
          source: source || 'direct',
          referrer: referrer || '',
          userAgent: userAgent,
          ipAddress: ipAddress,
          country: country || 'Unknown',
          device: device,
          browser: browser,
          os: os,
          visitCount: 1,
          pagesViewed: 1
        }
      });
    } else {
      visitor = await prisma.visitor.update({
        where: { id: visitor.id },
        data: {
          visitCount: { increment: 1 },
          pagesViewed: { increment: 1 },
          lastVisit: new Date()
        }
      });
    }
    
    // Track page view
    await prisma.pageView.create({
      data: {
        visitorId: visitor.id,
        page: page || 'unknown',
        path: path || '/',
        timestamp: new Date()
      }
    });
    
    res.status(200).json({
      success: true,
      data: { visitorId: visitor.id }
    });
  });

  // Get analytics (admin only)
  getAnalytics = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { period = '30d' } = req.query;
    
    // Date filter
    const dateFilter = new Date();
    if (period === '7d') dateFilter.setDate(dateFilter.getDate() - 7);
    else if (period === '30d') dateFilter.setDate(dateFilter.getDate() - 30);
    else if (period === '90d') dateFilter.setDate(dateFilter.getDate() - 90);
    
    // Total stats
    const [totalVisitors, totalPageViews, uniqueVisitors] = await Promise.all([
      prisma.visitor.count(),
      prisma.pageView.count({
        where: { timestamp: { gte: dateFilter } }
      }),
      prisma.visitor.count({
        where: { firstVisit: { gte: dateFilter } }
      })
    ]);
    
    // Top sources
    const sources = await prisma.visitor.groupBy({
      by: ['source'],
      where: { firstVisit: { gte: dateFilter } },
      _count: { source: true },
      orderBy: { _count: { source: 'desc' } }
    });
    
    // Top pages
    const pages = await prisma.pageView.groupBy({
      by: ['page'],
      where: { timestamp: { gte: dateFilter } },
      _count: { page: true },
      orderBy: { _count: { page: 'desc' } }
    });
    
    // Device breakdown
    const devices = await prisma.visitor.groupBy({
      by: ['device'],
      where: { firstVisit: { gte: dateFilter } },
      _count: { device: true }
    });
    
    // Daily visitors (last 7 days)
    const dailyVisitors = await prisma.$queryRaw`
      SELECT 
        DATE(timestamp) as date,
        COUNT(DISTINCT visitorId) as visitors
      FROM page_views
      WHERE timestamp >= datetime('now', '-7 days')
      GROUP BY DATE(timestamp)
      ORDER BY date ASC
    `;
    
    // Recent visitors
    const recentVisitors = await prisma.visitor.findMany({
      take: 20,
      orderBy: { lastVisit: 'desc' },
      include: {
        pageViews: {
          take: 1,
          orderBy: { timestamp: 'desc' }
        }
      }
    });
    
    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalVisitors,
          totalPageViews,
          uniqueVisitors,
          bounceRate: totalVisitors > 0 ? Math.round((totalVisitors - uniqueVisitors) / totalVisitors * 100) : 0
        },
        sources: sources.map(s => ({
          source: s.source || 'direct',
          count: s._count.source
        })),
        pages: pages.map(p => ({
          page: p.page,
          views: p._count.page
        })),
        devices: devices.map(d => ({
          device: d.device || 'unknown',
          count: d._count.device
        })),
        dailyVisitors,
        recentVisitors: recentVisitors.map(v => ({
          id: v.id,
          source: v.source,
          device: v.device,
          country: v.country,
          visitCount: v.visitCount,
          lastVisit: v.lastVisit,
          page: v.pageViews[0]?.page || 'unknown'
        }))
      }
    });
  });

  // Get visitor sources breakdown
  getSources = asyncHandler(async (_req: AuthRequest, res: Response) => {
    const sources = await prisma.visitor.groupBy({
      by: ['source'],
      _count: { source: true },
      _sum: { visitCount: true }
    });
    
    res.status(200).json({
      success: true,
      data: sources
    });
  });
}

export default new AnalyticsController();