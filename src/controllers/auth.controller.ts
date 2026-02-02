import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from '../utils/interfaces';
import AuthService from '../services/auth.service';
import { registerSchema, loginSchema } from '../dtos/auth.dto';
import { z } from 'zod';

class AuthController implements Controller {
  public path = '/auth';
  public router = Router();
  private authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.validate(registerSchema), this.signUp);
    this.router.post(`${this.path}/login`, this.validate(loginSchema), this.logIn);
  }

  private validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: any) {
      return res.status(400).send(err.errors);
    }
  };

  private signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const signUpUserData = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  private logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { token, findUser } = await this.authService.login(userData);
      
      res.setHeader('Authorization', `Bearer ${token}`);
      res.status(200).json({ data: findUser, token, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;