import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { Controller } from '../utils/interfaces';
import { registerSchema, loginSchema } from '../dtos/auth.dto';
import { z } from 'zod';

class AuthRoute implements Controller {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.validate(registerSchema), this.authController.signUp);
    this.router.post(`${this.path}/login`, this.validate(loginSchema), this.authController.logIn);
  }

  private validate = (schema: any) => (req: any, res: any, next: any) => {
    try {
      schema.parse({ body: req.body });
      next();
    } catch (err: any) {
      return res.status(400).send(err.errors);
    }
  };
}

export default AuthRoute;