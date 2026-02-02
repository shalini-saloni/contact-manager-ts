import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel, { IUser } from '../models/user.model';
import { HttpException } from '../utils/error';
import { RegisterDto, LoginDto } from '../dtos/auth.dto';
import { TokenData } from '../utils/interfaces';

class AuthService {
  private user = userModel;

  public async signup(userData: RegisterDto): Promise<IUser> {
    const findUser = await this.user.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: IUser = await this.user.create({ 
      ...userData, 
      password: hashedPassword 
    });

    return createUserData;
  }

  public async login(userData: LoginDto): Promise<{ cookie: string; token: string; findUser: IUser }> {
    const findUser = await this.user.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, token: tokenData.token, findUser };
  }

  public createToken(user: IUser): { token: string; expiresIn: number } {
    const dataStoredInToken: { id: string } = { id: user._id as unknown as string };
    const secretKey: string = process.env.JWT_SECRET || 'secret';
    const expiresIn: number = 60 * 60; 

    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: { token: string; expiresIn: number }): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;