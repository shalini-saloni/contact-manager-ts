import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '../utils/error';

export const authMiddleware = (req: Request | any, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return next(new HttpException(401, 'Authentication token missing'));
  }

  try {
    const verificationResponse = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = verificationResponse; 
    next();
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};