import { Router } from 'express';
import ContactController from '../controllers/contact.controller';
import { Controller } from '../utils/interfaces';
import { authMiddleware } from '../middlewares/auth.middleware';

class ContactRoute implements Controller {
  public path = '/contacts';
  public router = Router();
  public contactController = new ContactController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, this.contactController.create);
    this.router.get(`${this.path}`, authMiddleware, this.contactController.getAll);
    this.router.put(`${this.path}/:id`, authMiddleware, this.contactController.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.contactController.delete);
  }
}

export default ContactRoute;