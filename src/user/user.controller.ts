import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserRepository } from '../repository/user/user.repository';
import { AppError } from '../utils/app.erro';
import { PasswordHash } from '../utils/password.hash';
import { ChangePasswordDTO } from './changepassword.Dto';
import { UserDTO } from './user.Dto';

const UserNotFound = 'User not found.';
const UserInactive = 'Inactive user.';
const InvalidPassword = 'The current password is not valid.';
const ChangePassword =
  'The current password and the new password cannot be the same.';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private user: UserRepository,

    private hash: PasswordHash,
  ) {}

  @Post(':id')
  async updateUser(@Body() body: UserDTO, @Param('id') id: string) {
    const { email, name, avatar } = body;

    const userExists = await this.user.getUniqueById({ id });
    if (!userExists) {
      throw new AppError(UserNotFound, 400);
    }

    if (!userExists.active) {
      throw new AppError(UserInactive, 401);
    }

    userExists.avatar = avatar ? avatar : null;
    userExists.name = name;
    userExists.email = email;
    userExists.updatedAt = new Date();

    const userUpdated = await this.user.update({
      where: { id },
      data: userExists,
    });

    return {
      ...userUpdated,
      password: undefined,
    };
  }

  @Put(':id')
  async changePasswordUser(
    @Body() body: ChangePasswordDTO,
    @Param('id') id: string,
  ) {
    const { password, newPassword } = body;

    const userExists = await this.user.getUniqueById({ id });
    if (!userExists) {
      throw new AppError(UserNotFound, 400);
    }

    if (!userExists.active) {
      throw new AppError(UserInactive, 401);
    }

    if (password === newPassword) {
      throw new AppError(ChangePassword, 401);
    }

    const validPassword = await this.hash.compareHash(
      password,
      userExists.password,
    );
    if (!validPassword) {
      throw new AppError(InvalidPassword, 401);
    }

    userExists.password = await this.hash.generateHash(newPassword);
    userExists.updatedAt = new Date();

    const userUpdated = await this.user.update({
      where: { id },
      data: userExists,
    });

    return {
      ...userUpdated,
      password: undefined,
    };
  }
}
