import request from 'supertest';
import bcrypt from 'bcryptjs';
import faker from 'faker';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should not pass the validation for users', async () => {
    const user = await factory.attrs('User', {
      name: '',
      email: '',
      password: '',
    });

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should be not able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('should not pass the validation on update', async () => {
    const user = await factory.attrs('User', {
      password: '123456'
    });

    const responseStore = await request(app)
      .post('/users')
      .send(user);

    const { id, email, name } = responseStore.body;

    const responseSession = await request(app)
      .post('/sessions')
      .send({
        email,
        password: '123456'
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${responseSession.body.token}`)
      .send({
        id,
        email,
        name,
        oldPassword: '123456',
        password: '12345',
        confirmPassword: '12345',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to update duplicated email', async () => {
    const user = await factory.attrs('User', {
      password: '123456'
    });

    const userSecondary = await factory.attrs('User', {
      password: '123456'
    });

    const responseStore = await request(app)
      .post('/users')
      .send(user);

    const responseStoreSecondary = await request(app)
      .post('/users')
      .send(userSecondary);

    const { id, email, name } = responseStore.body;

    const { emailSecondary } = responseStoreSecondary.body;

    const responseSession = await request(app)
      .post('/sessions')
      .send({
        email,
        password: '123456'
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${responseSession.body.token}`)
      .send({
        id,
        email: emailSecondary,
        name,
      });

    expect(response.status).toBe(401);
  });

  it('should not update if old password is different', async () => {
    const user = await factory.attrs('User', {
      password: '123456'
    });

    const responseStore = await request(app)
      .post('/users')
      .send(user);

    const { id, email, name } = responseStore.body;

    const responseSession = await request(app)
      .post('/sessions')
      .send({
        email,
        password: '123456'
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${responseSession.body.token}`)
      .send({
        id,
        email,
        name,
        oldPassword: '1234567',
        password: '123456',
        confirmPassword: '123456',
      });

    expect(response.status).toBe(401);
  });

  it('should be able to update the user', async () => {
    const user = await factory.attrs('User');

    const responseStore = await request(app)
      .post('/users')
      .send(user);

    const { id, email, name } = responseStore.body;

    const responseSession = await request(app)
      .post('/sessions')
      .send({
        email,
        password: user.password
      });

    const newPassword = faker.internet.password();

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${responseSession.body.token}`)
      .send({
        id,
        email,
        name,
        oldPassword: user.password,
        password: newPassword,
        confirmPassword: newPassword,
      });

    expect(response.status).toBe(200);
  });
});
