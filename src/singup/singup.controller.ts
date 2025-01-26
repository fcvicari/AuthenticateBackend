import { Body, Controller, Post } from '@nestjs/common';
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

    await this.userToken.create({
      user: { connect: userCreated },
    });

    return {
      ...userCreated,
      password: undefined,
    };
  }
}
