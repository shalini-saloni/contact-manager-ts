import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';
import { IUser } from '../models/user.model';

class AuthController {
  private authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const signUpUserData: IUser = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { token, findUser } = await this.authService.login(userData);
      res.status(200).json({ data: findUser, token, message: 'login' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;