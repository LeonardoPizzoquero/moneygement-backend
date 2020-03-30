import * as Yup from 'yup';

import User from '../models/User';

class BalanceController {
  async update(req, res) {
    const schema = Yup.object().shape({
      current_balance: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { current_balance } = req.body;

    const user = await User.findByPk(req.userId);

    await user.update({ current_balance });

    return res.json({ current_balance });
  }
}

export default new BalanceController();
