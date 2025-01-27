import { Test, TestingModule } from '@nestjs/testing';
import { JwtServiceMock } from '../../test/mocks/jwtService.mock';
import { passwordHashMock } from '../../test/mocks/password.hash.mock';
import { userServiceMock } from '../../test/mocks/user.repository.mock';
import { userTokenServiceMock } from '../../test/mocks/userToken.repository.mock';
import { UserController } from './user.controller';

describe('UserController Tests', () => {
  let userController: UserController;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        passwordHashMock,
        userServiceMock,
        userTokenServiceMock,
        JwtServiceMock,
      ],
    }).compile();

    userController = moduleFixture.get<UserController>(UserController);
  });

  it('Should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('Update user - id does not exist', async () => {
    const body = {
      email: 'jonhdoe@jonhdoe.com',
      name: 'Jonh Doe',
      avatar: 'avatar',
    };

    await expect(
      userController.updateUser(body, 'idNotExists'),
    ).rejects.toHaveProperty('statusCode', 400);
  });

  it('Update user - inactive user', async () => {
    const body = {
      email: 'jonhdoe@jonhdoe.com',
      name: 'Jonh Doe',
      avatar: 'avatar',
    };

    await expect(userController.updateUser(body, '2')).rejects.toHaveProperty(
      'statusCode',
      401,
    );
  });

  it('Update user - success', async () => {
    const body = {
      email: 'jonhdoe@jonhdoe.com',
      name: 'Jonh Doe Update',
      avatar: 'avatar',
    };

    const updateUser = await userController.updateUser(body, '1');

    expect(updateUser.email).toEqual(body.email);
  });
});
