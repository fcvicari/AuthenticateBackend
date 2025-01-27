import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from './database/prisma.service';
import { UserRepository } from './repository/user/user.repository';
import { UserTokenRepository } from './repository/userToken/userToken.repository';
import { SingInController } from './singin/singin.controller';
import { SingupController } from './singup/singup.controller';
import { UserController } from './user/user.controller';
import { PasswordHash } from './utils/password.hash';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [SingupController, SingInController, UserController],
  providers: [PasswordHash, PrismaService, UserRepository, UserTokenRepository],
})
export class AppModule {}
