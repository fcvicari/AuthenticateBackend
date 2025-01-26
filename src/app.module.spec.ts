import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma.service';
import { UserRepository } from './repository/user/user.repository';
import { UserTokenRepository } from './repository/userToken/userToken.repository';
import { SingupController } from './singup/singup.controller';
import { PasswordHash } from './utils/password.hash';

describe('AppModule Test', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(moduleRef).toBeDefined();
  });

  it('should register UserRepository provider', () => {
    const userRepository = moduleRef.get<UserRepository>(UserRepository);
    expect(userRepository).toBeDefined();
  });

  it('should register UserTokenRepository provider', () => {
    const userTokenRepository = moduleRef.get<UserTokenRepository>(UserTokenRepository);
    expect(userTokenRepository).toBeDefined();
  });

  it('should register SingupController', () => {
    const singupController = moduleRef.get<SingupController>(SingupController);
    expect(singupController).toBeDefined();
  });

  it('should register PasswordHash provider', () => {
    const passwordHash = moduleRef.get<PasswordHash>(PasswordHash);
    expect(passwordHash).toBeDefined();
  });

  it('should register PrismaService provider', () => {
    const prismaService = moduleRef.get<PrismaService>(PrismaService);
    expect(prismaService).toBeDefined();
  });
});
