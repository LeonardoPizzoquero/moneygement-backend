import * as Yup from 'yup';

import FacebookUser from '../models/FacebookUser';

class FacebookUserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      user_id: Yup.number().positive().integer().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await FacebookUser.findOne({ where: { email: req.body.email }});


    if (userExists) {
      return res.json({ id: userExists.id, name: userExists.name, email: userExists.email, user_id: userExists.user_id });
    }

    const { id, name, email, user_id } = await FacebookUser.create(req.body);

    return res.json({ id, name, email, user_id });
  }
}

export default new FacebookUserController();
