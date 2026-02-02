import { Request, Response, NextFunction } from 'express';
import ContactService from '../services/contact.service';

class ContactController {
  private contactService = new ContactService();

  public create = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const result = await this.contactService.createContact(req.body, req.user.id);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const result = await this.contactService.getAllContacts(req.user.id, req.query);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      const result = await this.contactService.updateContact(req.params.id, req.body, req.user.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      await this.contactService.deleteContact(req.params.id, req.user.id);
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default ContactController;