import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../types';

export class AboutController {
  // Get public about (for visitors)
  getPublicAbout = asyncHandler(async (_req: Request, res: Response) => {
    const about = await prisma.about.findFirst({
      where: { isPublic: true },
    });

    if (!about) {
      return res.status(404).json({
        success: false,
        error: 'About not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        ...about,
        journey: JSON.parse(about.journey || '[]'),
        skills: JSON.parse(about.skills || '[]'),
        achievements: JSON.parse(about.achievements || '[]'),
        stats: JSON.parse(about.stats || '[]'),
        strengths: JSON.parse(about.strengths || '[]'),
        expertise: JSON.parse(about.expertise || '[]'),
      }
    });
  });

  // Get admin about (with all data)
  getAdminAbout = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const about = await prisma.about.findUnique({
      where: { userId: userId },
    });

    if (!about) {
      return res.status(404).json({
        success: false,
        error: 'About not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        ...about,
        journey: JSON.parse(about.journey || '[]'),
        skills: JSON.parse(about.skills || '[]'),
        achievements: JSON.parse(about.achievements || '[]'),
        stats: JSON.parse(about.stats || '[]'),
        strengths: JSON.parse(about.strengths || '[]'),
        expertise: JSON.parse(about.expertise || '[]'),
      }
    });
  });

  // Create or update about (admin only)
  upsertAbout = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const {
      fullName, title, bio, location, profileImage,
      githubUrl, linkedinUrl, twitterUrl, leetcodeUrl,
      journey, skills, achievements, stats, strengths, expertise,
      isPublic
    } = req.body;

    const about = await prisma.about.upsert({
      where: { userId: userId },
      update: {
        fullName: fullName || '',
        title: title || '',
        bio: bio || '',
        location: location || '',
        profileImage: profileImage || '',
        githubUrl: githubUrl || '',
        linkedinUrl: linkedinUrl || '',
        twitterUrl: twitterUrl || '',
        leetcodeUrl: leetcodeUrl || '',
        journey: JSON.stringify(journey || []),
        skills: JSON.stringify(skills || []),
        achievements: JSON.stringify(achievements || []),
        stats: JSON.stringify(stats || []),
        strengths: JSON.stringify(strengths || []),
        expertise: JSON.stringify(expertise || []),
        isPublic: isPublic !== undefined ? isPublic : true,
      },
      create: {
        userId: userId,
        fullName: fullName || '',
        title: title || '',
        bio: bio || '',
        location: location || '',
        profileImage: profileImage || '',
        githubUrl: githubUrl || '',
        linkedinUrl: linkedinUrl || '',
        twitterUrl: twitterUrl || '',
        leetcodeUrl: leetcodeUrl || '',
        journey: JSON.stringify(journey || []),
        skills: JSON.stringify(skills || []),
        achievements: JSON.stringify(achievements || []),
        stats: JSON.stringify(stats || []),
        strengths: JSON.stringify(strengths || []),
        expertise: JSON.stringify(expertise || []),
        isPublic: isPublic !== undefined ? isPublic : true,
      }
    });

    return res.status(200).json({
      success: true,
      message: 'About saved successfully',
      data: about
    });
  });
}

export default new AboutController();