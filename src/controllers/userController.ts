import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";
import { body, validationResult } from 'express-validator';


// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     const newUser = new User({
//       name,
//       email,
//       password,
//     });

//     await newUser.save();

//     res.send("User created successfully");
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).send("An error occurred while creating the user");
//   }
// };

export const createUser = [
  // Define the validation rules using express-validator functions
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  // Middleware function to handle the validation results
  (req: Request, res: Response, next: NextFunction) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return an error response if there are validation errors
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Proceed to the next middleware if there are no validation errors
    next();
  }
];


// Add more route handlers for retrieving, updating, and deleting users if needed
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).send("An error occurred while retrieving users");
  }
};

// find user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).send("An error occurred while retrieving the user");
  }
};

// update user by id
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("An error occurred while updating the user");
  }
};

// delete user by id
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("An error occurred while deleting the user");
  }
};