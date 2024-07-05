import { Request, Response, NextFunction } from 'express';
import { verifyJWTToken } from './auth';
import db from '../models/';
import { logger } from '../logger/Logger';

export const verifyJWT_MW = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.headers && req.headers['authorization']) {
      const authHeader = req.headers['authorization'];
      const token = authHeader.split(' ')[1]; 

      const decode:any = await verifyJWTToken(token);
      const user = await db.User.findOne({
        where: { userName: decode.data.userName, id: decode.data.id }
      });

      if (!user) {
        req.user = undefined;
      } else {
        req.user = user;
      }
      next();
    } else {
      req.user = undefined;
      return res.status(401).json({ success: false, message: 'Unauthorized user!' });
    }
  } catch (err: any) {    
    req.user = undefined;
    logger.error(err);
    if (err.name === 'JsonWebTokenError') {
      res.status(400).json({ message: 'Invalid auth token provided.' });
    } else {
      next(err);
    }
  }
};
