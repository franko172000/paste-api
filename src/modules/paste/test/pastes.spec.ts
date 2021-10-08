import Container from 'typedi';
import { Connection } from 'typeorm';
import { tearDownDatabase, useRefreshDatabase } from 'typeorm-seeding';
import dbconnection from '../../../loaders/dbconnection';
import PasteService from '../paste.service';
import { Pastes } from '../entity/paste.entity';
import { Users } from '../../users/entities/users.entity';
import config from '../../../config';

let connection: Connection;
let pastService: PasteService;
const pastData = {
  name: 'test@email.com',
  content: 'test',
};
const userData = {
  email: 'test@email.com',
  password: 'test',
  name: 'John Doe',
};
let user: Users;
describe('Testing paste service class', () => {
  beforeAll(async () => {
    await dbconnection();
    connection = await useRefreshDatabase({
      connection: 'memory',
    });
    pastService = Container.get(PasteService);
    user = await Users.save(Users.create(userData));
  });

  afterAll(async done => {
    await tearDownDatabase();
    done();
  });

  it('Test service can add content', async () => {
    const result = await pastService.addPaste(pastData, user.id);
    const paste = await Pastes.findOne(1);
    const url = config.baseUrl + config.api.prefix + 'paste/' + paste.code;
    expect(paste.name).toEqual(pastData.name);
    expect(paste.content).toEqual(pastData.content);
    expect(paste.userId).toEqual(user.id);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.data).toHaveProperty('url');
    expect(result.message).toEqual('Content successfully created!');
    expect(result.data.url).toEqual(url);
  });

  it('Test service can retrieve user paste', async () => {
    const result = await pastService.getUserPastes(user.id);
    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('message');
    expect(result.data.length).toEqual(1);
    expect(result.message).toEqual('Ok');
    const data = result.data[0];
    expect(data.name).toEqual(pastData.name);
    expect(data.content).toEqual(pastData.content);
  });
});
