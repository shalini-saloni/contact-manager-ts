import { Router } from 'express';

export interface Controller {
  path: string;
  router: Router;
}

export interface TokenData {
  id: string;
  expiresIn: number;
}