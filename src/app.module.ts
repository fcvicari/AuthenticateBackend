import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UserRepository } from './repository/user/user.repository';
import { UserTokenRepository } from './repository/userToken/userToken.repository';
import { SingupController } from './singup/singup.controller';
import { PasswordHash } from './utils/password.hash';

@Module({
  imports: [],
  controllers: [SingupController],
  providers: [PasswordHash, PrismaService, UserRepository, UserTokenRepository],
})
export class AppModule {}
