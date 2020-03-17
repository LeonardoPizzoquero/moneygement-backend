import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('FacebookUser', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should not pass the validation for facebook users', async () => {
    const user = await factory.attrs('FacebookUser', {
      name: '',
      email: '',
      userID: null,
    });

    const response = await request(app)
      .post('/facebook_users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should return the same user if email already exists', async () => {
    const user = await factory.attrs('FacebookUser');

    const createUser = await request(app)
      .post('/facebook_users')
      .send(user);

    const response = await request(app)
      .post('/facebook_users')
      .send(user);

    expect(response.body.id).toBe(createUser.body.id);
  });

  it('should be able to register facebook users', async () => {
    const user = await factory.attrs('FacebookUser');

    const response = await request(app)
      .post('/facebook_users')
      .send(user);

    console.log(response);

    expect(response.body).toHaveProperty('id');
  });
});
