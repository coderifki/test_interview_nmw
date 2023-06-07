import { param } from 'express-validator';



export const getUserByIdValidation = [
  param('id').notEmpty().withMessage('User ID is required'),
  // ... additional validation rules for the user ID
];

export const updateUserByIdValidation = [
  param('id').notEmpty().withMessage('User ID is required'),
  // ... additional validation rules for the user ID
  // ... additional validation rules for the updated user data
];

export const deleteUserByIdValidation = [
  param('id').notEmpty().withMessage('User ID is required'),
  // ... additional validation rules for the user ID
];
