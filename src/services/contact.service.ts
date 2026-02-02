import contactModel, { IContact } from '../models/contact.model';
import { HttpException } from '../utils/error.ts';

class ContactService {
  private contact = contactModel;

  public async createContact(data: Partial<IContact>, userId: string): Promise<IContact> {
    return await this.contact.create({ ...data, userId });
  }

  public async getAllContacts(userId: string, query: any) {
    const { page = 1, limit = 10, search, tag } = query;
    const filter: any = { userId }; 

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (tag) {
      filter.tags = tag;
    }

    const contacts = await this.contact
      .find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 });

    const total = await this.contact.countDocuments(filter);

    return { data: contacts, total, page: Number(page), lastPage: Math.ceil(total / Number(limit)) };
  }

  public async updateContact(id: string, data: Partial<IContact>, userId: string): Promise<IContact> {
    const updatedContact = await this.contact.findOneAndUpdate(
      { _id: id, userId }, 
      data,
      { new: true }
    );
    if (!updatedContact) throw new HttpException(404, 'Contact not found or unauthorized');
    return updatedContact;
  }

  public async deleteContact(id: string, userId: string): Promise<IContact> {
    const deletedContact = await this.contact.findOneAndDelete({ _id: id, userId });
    if (!deletedContact) throw new HttpException(404, 'Contact not found or unauthorized');
    return deletedContact;
  }
}

export default ContactService;