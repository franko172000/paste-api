import Container from 'typedi';
import { Connection } from 'typeorm';
import { runSeeder, tearDownDatabase, useRefreshDatabase } from 'typeorm-seeding';
import {app, startServer} from '../../app'
import UsersSeeder from '../../database/seeds/users.seed';
import { Users } from '../users/entities/users.entity';
import supertest from 'supertest';
import config from '../../config';
import { userData } from '../../mocks';


let request;
let user: Users;
let connection: Connection;
let server;

describe('Testing User API routes', () => {
  beforeAll(async () => {
      try{
          server = await startServer();
      }catch(err){}
    
    request = supertest(app)
    connection = await useRefreshDatabase({
        connection: 'memory' 
    })
    await runSeeder(UsersSeeder);
  });

  afterAll(async done => {
    await tearDownDatabase()
    server.close()
    done();
  });

  it('Test create user', async done => {
    //find treasure
    const response = await request.post('/api/v1/user/register')
    .send(userData)
    expect(response.status).toEqual(201)
    expect(response.body.message).toEqual(`User created!`)
    done()
  });

  it('Test user registation validation', async done => {
    //find treasure
    const response = await request.post('/api/v1/user/register')
    .send({})
    expect(response.status).toEqual(400)
    expect(response.body.name).toEqual('BadRequestError')
    expect(response.body.message).toEqual(`You have an error in your request's body. Check 'errors' field for more details!`)
    expect(response.body.errors.length).toEqual(4)
    done()
  });

  it('Test user login', async done => {
    //find treasure
    const response = await request.post('/api/v1/user/login')
    .send({
        email: userData.email,
        password: userData.password
    })
    
    expect(response.status).toEqual(200)
    expect(response.body.message).toEqual(`Login Successful`)
    expect(response.body).toHaveProperty('data')
    expect(response.body.data).toHaveProperty('token')
    done()
  });

  it('Test invalid user login', async done => {
    //find treasure
    const response = await request.post('/api/v1/user/login')
    .send({
        email: 'test@test.com',
        password: userData.password
    })
    expect(response.status).toEqual(401)
    expect(response.body.message).toEqual(`Invalid credentials`)
    done()
  });

  it('Test login field validation', async done => {
    //find treasure
    const response = await request.post('/api/v1/user/login')
    .send({})
    expect(response.status).toEqual(400)
    expect(response.body.name).toEqual('BadRequestError')
    expect(response.body.message).toEqual(`You have an error in your request's body. Check 'errors' field for more details!`)
    expect(response.body.errors.length).toEqual(2)
    done()
  });  
});
