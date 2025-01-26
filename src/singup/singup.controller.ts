import { Body, Controller, Post, Query } from '@nestjs/common';
import { differenceInHours } from 'date-fns';
import { UserRepository } from '../repository/user/user.repository';
import { UserTokenRepository } from '../repository/userToken/userToken.repository';
import { AppError } from '../utils/app.erro';
import { PasswordHash } from '../utils/password.hash';
import { SingUpDTO } from './singup.Dto';

@Controller()
export class SingupController {
  constructor(
    private user: UserRepository,

    private hash: PasswordHash,

    private userToken: UserTokenRepository,
  ) {}

  @Post('singup')
  async postNewUser(@Body() body: SingUpDTO) {
    const { email, name, password } = body;

    const userExists = await this.user.findByEmail({ email });
    if (userExists) {
      throw new AppError('This email is already used by another user.', 400);
    }

    const hasPassword = await this.hash.generateHash(password);

    const userCreated = await this.user.create({
      name,
      email,
      password: hasPassword,
      active: false,
    });

    const usersToken = await this.userToken.create({
      user: { connect: userCreated },
    });

    return {
      ...userCreated,
      password: undefined,
      activateToken: usersToken.id,
    };
  }

  @Post('activate')
  async postActivateUser(@Query() query) {
    const { token } = query;

    const userToken = await this.userToken.findById({ id: token });
    if (userToken) {
      if (differenceInHours(Date.now(), userToken.createdAt) > 2) {
        throw new AppError('Token expired.', 400);
      }

      const user = await this.user.activateUser(userToken.userID);

      await this.userToken.deleteAll({
        userID: userToken.userID,
      });

      return { ...user, password: undefined };
    }

    return null;
  }
}
