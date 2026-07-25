import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { asyncHandler } from '../utils/errorHandler';
import { AuthRequest } from '../types';

export class ResumeController {
  // Get public resume (for visitors)
  getPublicResume = asyncHandler(async (req: Request, res: Response) => {
    const resume = await prisma.resume.findFirst({
      where: { isPublic: true },
      include: {
        experiences: { orderBy: { order: 'asc' } },
        educations: { orderBy: { order: 'asc' } },
        certifications: { orderBy: { order: 'asc' } },
        languages: { orderBy: { order: 'asc' } },
        interests: { orderBy: { order: 'asc' } },
        user: {
          select: { firstName: true, lastName: true, email: true }
        }
      }
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  });

  // Get admin resume (with all data)
  getAdminResume = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const resume = await prisma.resume.findUnique({
      where: { userId: userId },
      include: {
        experiences: { orderBy: { order: 'asc' } },
        educations: { orderBy: { order: 'asc' } },
        certifications: { orderBy: { order: 'asc' } },
        languages: { orderBy: { order: 'asc' } },
        interests: { orderBy: { order: 'asc' } }
      }
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  });

  // Create or update resume (admin only)
  upsertResume = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const {
      fullName, title, email, phone, location, website,
      github, linkedin, summary, avatarUrl, isPublic
    } = req.body;

    const resume = await prisma.resume.upsert({
      where: { userId: userId },
      update: {
        fullName,
        title,
        email,
        phone,
        location,
        website,
        github,
        linkedin,
        summary,
        avatarUrl,
        isPublic: isPublic !== undefined ? isPublic : true
      },
      create: {
        userId: userId,
        fullName,
        title,
        email,
        phone,
        location,
        website,
        github,
        linkedin,
        summary,
        avatarUrl,
        isPublic: isPublic !== undefined ? isPublic : true
      }
    });

    res.status(200).json({
      success: true,
      message: 'Resume saved successfully',
      data: resume
    });
  });

  // Add Experience
  addExperience = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const {
      company, position, location, startDate, endDate,
      current, description, technologies, order
    } = req.body;

    const resume = await prisma.resume.findUnique({
      where: { userId: userId }
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    const experience = await prisma.experience.create({
      data: {
        resumeId: resume.id,
        company,
        position,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        description,
        technologies: technologies || '[]',
        order: order || 0
      }
    });

    res.status(201).json({
      success: true,
      message: 'Experience added successfully',
      data: experience
    });
  });

  // Update Experience
  updateExperience = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const experienceId = parseInt(id as string, 10);
    
    if (isNaN(experienceId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid experience ID'
      });
    }

    const {
      company, position, location, startDate, endDate,
      current, description, technologies, order
    } = req.body;

    const experience = await prisma.experience.update({
      where: { id: experienceId },
      data: {
        company,
        position,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        description,
        technologies: technologies || '[]',
        order: order || 0
      }
    });

    res.status(200).json({
      success: true,
      message: 'Experience updated successfully',
      data: experience
    });
  });

  // Delete Experience
  deleteExperience = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const experienceId = parseInt(id as string, 10);
    
    if (isNaN(experienceId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid experience ID'
      });
    }

    await prisma.experience.delete({
      where: { id: experienceId }
    });

    res.status(200).json({
      success: true,
      message: 'Experience deleted successfully'
    });
  });

  // Add Education
  addEducation = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const {
      institution, degree, field, location, startDate,
      endDate, current, description, order
    } = req.body;

    const resume = await prisma.resume.findUnique({
      where: { userId: userId }
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    const education = await prisma.education.create({
      data: {
        resumeId: resume.id,
        institution,
        degree,
        field,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        description,
        order: order || 0
      }
    });

    res.status(201).json({
      success: true,
      message: 'Education added successfully',
      data: education
    });
  });

  // Update Education
  updateEducation = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const educationId = parseInt(id as string, 10);
    
    if (isNaN(educationId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid education ID'
      });
    }

    const {
      institution, degree, field, location, startDate,
      endDate, current, description, order
    } = req.body;

    const education = await prisma.education.update({
      where: { id: educationId },
      data: {
        institution,
        degree,
        field,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        current: current || false,
        description,
        order: order || 0
      }
    });

    res.status(200).json({
      success: true,
      message: 'Education updated successfully',
      data: education
    });
  });

  // Delete Education
  deleteEducation = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const educationId = parseInt(id as string, 10);
    
    if (isNaN(educationId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid education ID'
      });
    }

    await prisma.education.delete({
      where: { id: educationId }
    });

    res.status(200).json({
      success: true,
      message: 'Education deleted successfully'
    });
  });

  // Add Certification
  addCertification = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const {
      name, issuer, date, expiryDate, credentialId, url, logo, order
    } = req.body;

    const resume = await prisma.resume.findUnique({
      where: { userId: userId }
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    const certification = await prisma.certification.create({
      data: {
        resumeId: resume.id,
        name,
        issuer,
        date: date ? new Date(date) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        credentialId,
        url,
        logo,
        order: order || 0
      }
    });

    res.status(201).json({
      success: true,
      message: 'Certification added successfully',
      data: certification
    });
  });

  // Delete Certification
  deleteCertification = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const certificationId = parseInt(id as string, 10);
    
    if (isNaN(certificationId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid certification ID'
      });
    }

    await prisma.certification.delete({
      where: { id: certificationId }
    });

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully'
    });
  });

  // Add Language
  addLanguage = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const { name, proficiency, order } = req.body;

    const resume = await prisma.resume.findUnique({
      where: { userId: userId }
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    const language = await prisma.language.create({
      data: {
        resumeId: resume.id,
        name,
        proficiency,
        order: order || 0
      }
    });

    res.status(201).json({
      success: true,
      message: 'Language added successfully',
      data: language
    });
  });

  // Delete Language
  deleteLanguage = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const languageId = parseInt(id as string, 10);
    
    if (isNaN(languageId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid language ID'
      });
    }

    await prisma.language.delete({
      where: { id: languageId }
    });

    res.status(200).json({
      success: true,
      message: 'Language deleted successfully'
    });
  });

  // Add Interest
  addInterest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized'
      });
    }

    const { name, icon, order } = req.body;

    const resume = await prisma.resume.findUnique({
      where: { userId: userId }
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        error: 'Resume not found'
      });
    }

    const interest = await prisma.interest.create({
      data: {
        resumeId: resume.id,
        name,
        icon,
        order: order || 0
      }
    });

    res.status(201).json({
      success: true,
      message: 'Interest added successfully',
      data: interest
    });
  });

  // Delete Interest
  deleteInterest = asyncHandler(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const interestId = parseInt(id as string, 10);
    
    if (isNaN(interestId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid interest ID'
      });
    }

    await prisma.interest.delete({
      where: { id: interestId }
    });

    res.status(200).json({
      success: true,
      message: 'Interest deleted successfully'
    });
  });
}

export default new ResumeController();