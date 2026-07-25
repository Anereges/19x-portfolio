import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from './errorHandler';

// User validation
export const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be 3-30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase, one lowercase, and one number'),
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name must be less than 50 characters'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name must be less than 50 characters'),
];

export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

// Project validation for CREATE
export const validateCreateProject = [
  body('title')
    .isLength({ min: 3, max: 255 })
    .withMessage('Title must be 3-255 characters'),
  body('slug')
    .isSlug()
    .withMessage('Slug must be a valid URL slug')
    .isLength({ min: 3, max: 255 })
    .withMessage('Slug must be 3-255 characters'),
  body('description')
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  body('category')
    .isIn(['SOFTWARE', 'CYBERSECURITY'])
    .withMessage('Category must be SOFTWARE or CYBERSECURITY'),
  body('githubUrl')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Invalid GitHub URL'),
  body('demoUrl')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Invalid demo URL'),
  body('imageUrl')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Invalid image URL'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean'),
];

// Project validation for UPDATE - all fields optional
export const validateUpdateProject = [
  param('id')
    .isInt()
    .withMessage('Project ID must be a number'),
  body('title')
    .optional()
    .isLength({ min: 3, max: 255 })
    .withMessage('Title must be 3-255 characters'),
  body('slug')
    .optional()
    .isSlug()
    .withMessage('Slug must be a valid URL slug')
    .isLength({ min: 3, max: 255 })
    .withMessage('Slug must be 3-255 characters'),
  body('description')
    .optional()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  body('category')
    .optional()
    .isIn(['SOFTWARE', 'CYBERSECURITY'])
    .withMessage('Category must be SOFTWARE or CYBERSECURITY'),
  body('githubUrl')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Invalid GitHub URL'),
  body('demoUrl')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Invalid demo URL'),
  body('imageUrl')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Invalid image URL'),
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be a boolean'),
];

// Contact message validation
export const validateContact = [
  body('name')
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be 2-255 characters'),
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('subject')
    .isLength({ min: 3, max: 255 })
    .withMessage('Subject must be 3-255 characters'),
  body('message')
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters'),
];

// Validation result handler
export const handleValidationErrors = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMap: Record<string, string[]> = {};
    errors.array().forEach((error) => {
      if (error.type === 'field') {
        const field = error.path;
        if (!errorMap[field]) {
          errorMap[field] = [];
        }
        errorMap[field].push(error.msg);
      }
    });
    throw new ValidationError('Validation failed', errorMap);
  }
  next();
};