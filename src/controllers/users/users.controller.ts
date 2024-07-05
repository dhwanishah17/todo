// controllers/userController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../../models';
import jwt from 'jsonwebtoken';
import { createJWToken } from '../../config/auth';
import { logger } from '../../logger/Logger';
import { log } from 'console';

const userModel = db['User'];
export class UsersController {
  // Register a new user
  async createUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email,userName, password } = req.body;
      // Hash the password
      const userExist =await userModel.findOne({ where: { userName }});

      if (userExist) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword
      });
      const token = jwt.sign({ userId: newUser._id }, 'your_jwt_secret', { expiresIn: '1h' });

      const userWithoutPassword = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        userName: newUser.userName,
        token
      };
      res.status(201).json({ success: true, user: userWithoutPassword });
    } catch (err) {
      console.log('error,err',err);

      logger.error(err);
      res.status(500).json({ success: false, message: 'Failed to create user.' });
    }
  }

  // Login user
  async loginUser(req: Request, res: Response) {
    try {
      const {userName, password } = req.body;

      const user = await userModel.findOne({ where: { userName }});

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }

      // Log for debugging
      console.log('Entered Password:', password);
      console.log('Stored Hashed Password:', user.password);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password Comparison Result:', isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: 'Invalid password.' });
      }

      const token = createJWToken({ id: user.id, userName: user.userName });
      user.accessToken = token;
      await user.save();
      res.status(200).json({ success: true, token });
    } catch (err) {
      logger.error(err);
      console.log(err)
      res.status(500).json({ success: false, message: 'Failed to login.' });
    }
  }

}

