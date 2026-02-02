import { Router, Request, Response, NextFunction } from 'express';
import { Controller } from '../utils/interfaces';
import ContactService from '../services/contact.service';
import { authMiddleware } from '../middlewares/auth.middleware'; 

class ContactController implements Controller {
  public path = '/contacts';
  public router = Router();
  private contactService = new ContactService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, authMiddleware, this.create);
    this.router.get(`${this.path}`, authMiddleware, this.getAll);
    this.router.put(`${this.path}/:id`, authMiddleware, this.update);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.delete);
  }

  private create = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const result = await this.contactService.createContact(req.body, req.user.id);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  private getAll = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const result = await this.contactService.getAllContacts(req.user.id, req.query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  private update = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const result = await this.contactService.updateContact(req.params.id, req.body, req.user.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  private delete = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      await this.contactService.deleteContact(req.params.id, req.user.id);
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default ContactController;