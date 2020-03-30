import * as Yup from 'yup';

import User from '../models/User';

class FacebookUserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email }});

    if (userExists && userExists.facebook_user === true) {
      return res.json(userExists);
    }

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      facebook_user: true,
    }

    const { id, name, email } = await User.create(newUser);

    return res.json({ id, name, email });
  }
}

export default new FacebookUserController();
