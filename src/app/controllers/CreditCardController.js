import * as Yup from 'yup';
import CreditCard from '../models/CreditCard';
import Bank from '../models/Bank';
import File from '../models/File';

class CreditCardController {
  async index(req, res) {
    const cards = await CreditCard.findAll({
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

    return res.json(cards);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      limit: Yup.number().required(),
      invoice: Yup.number().required(),
      invoice_expiration: Yup.date(),
      bank_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const data = {
      ...req.body,
      user_id: req.userId,
    }

    const card = await CreditCard.create(data);

    return res.json(card);
  }
}

export default new CreditCardController();
