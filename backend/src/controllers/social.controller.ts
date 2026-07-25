import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { asyncHandler } from '../utils/errorHandler';

export class SocialController {
  // Get all active social media accounts
  getSocialLinks = asyncHandler(async (req: Request, res: Response) => {
    const socialLinks = await prisma.socialMedia.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });

    res.status(200).json({
      success: true,
      data: socialLinks,
    });
  });

  // Create social media account (admin only)
  createSocialLink = asyncHandler(async (req: Request, res: Response) => {
    const { platform, name, url, icon, followers, active, order } = req.body;

    const socialLink = await prisma.socialMedia.create({
      data: {
        platform,
        name,
        url,
        icon,
        followers: followers || 0,
        active: active !== undefined ? active : true,
        order: order || 0,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Social media account created successfully',
      data: socialLink,
    });
  });

  // Update social media account (admin only)
  updateSocialLink = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { platform, name, url, icon, followers, active, order } = req.body;

    const socialLink = await prisma.socialMedia.update({
      where: { id: parseInt(id) },
      data: {
        platform,
        name,
        url,
        icon,
        followers,
        active,
        order,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Social media account updated successfully',
      data: socialLink,
    });
  });

  // Delete social media account (admin only)
  deleteSocialLink = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.socialMedia.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Social media account deleted successfully',
    });
  });
}

export default new SocialController();