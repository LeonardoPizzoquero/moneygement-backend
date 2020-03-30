import * as Yup from 'yup';
import Ticket from '../models/Ticket';
import Bank from '../models/Bank';
import File from '../models/File';

class TicketController {
  async index(req, res) {
    const tickets = await Ticket.findAll({
      where: { user_id: req.userId },
      include: [{
        model: Bank,
        as: 'bank',
        attributes: ['id', 'name', 'color'],
        include: [{
          model: File,
          as: 'image',
          attributes: ['id', 'path', 'url']
        }]
      }]
    });

    return res.json(tickets);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      balance: Yup.number().required(),
      plan: Yup.string().required(),
      bank_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const data = {
      ...req.body,
      user_id: req.userId,
    }

    const ticket = await Ticket.create(data);

    return res.json(ticket);
  }
}

export default new TicketController();
