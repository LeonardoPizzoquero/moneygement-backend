import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import FacebookUser from '../src/app/models/FacebookUser';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('FacebookUser', FacebookUser, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  user_id: faker.random.number(10000),
});


export default factory;
