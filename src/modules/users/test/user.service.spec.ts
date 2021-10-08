import Container from 'typedi';
import { Connection } from 'typeorm';
import { tearDownDatabase, useRefreshDatabase } from 'typeorm-seeding';
import dbconnection from '../../../loaders/dbconnection';
import { Users } from '../entities/users.entity';
import UserService from '../user.service';

let connection: Connection;
let userService: UserService;
const userData = {
  email: 'test@email.com',
  password: 'test',
  name: 'John Doe',
}
describe('Testing Auth service class', () => {
  beforeAll(async () => {
    await dbconnection();
    connection = await useRefreshDatabase({
      connection: 'memory',
    });
    userService = Container.get(UserService);
  });

  afterAll(async done => {
    await tearDownDatabase();
    done();
  });

  it('Test service can register new user', async () => {
    await userService.registerUser(userData);
    const user = await Users.findOne({
      where: {
        email: userData.email,
      },
    });

    expect(user.email).toEqual(userData.email);
    expect(user.name).toEqual(userData.name);
    expect(user.password).toEqual(userData.password);
  });

  it('Test user can login', async () => {
    const response = await userService.login({
      email: userData.email,
      password: userData.password,
    });

    expect(response).toHaveProperty('data');
    expect(response.data).toHaveProperty('token');
    expect(response).toHaveProperty('message');
    expect(response.message).toEqual('Login Successful');
  });

  it('Test user login failure', async () => {
    try {
      await userService.login({
        email: 'test@test.com',
        password: 'test',
      });
    } catch (err) {
      expect(err.message).toEqual('Invalid credentials');
      expect(err.httpCode).toEqual(401);
    }
  });
});
