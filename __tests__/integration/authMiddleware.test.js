import request from 'supertest';
import faker from 'faker';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should not valid token', async () => {
    const user = await factory.attrs('User', {
      password: '123456'
    });

    const responseStore = await request(app)
      .post('/users')
      .send(user);

    const { id, email, name } = responseStore.body;

    const fakeToken = faker.random.uuid;

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${fakeToken}`)
      .send({
        id,
        email,
        name,
      });

    expect(response.status).toBe(401);
  });

  it('should not provide token', async () => {
    const user = await factory.attrs('User', {
      password: '123456'
    });

    const responseStore = await request(app)
      .post('/users')
      .send(user);

    const { id, email, name } = responseStore.body;

    const response = await request(app)
      .put('/users')
      .send({
        id,
        email,
        name,
      });

    expect(response.status).toBe(401);
  });
});
