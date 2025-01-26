import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(userData: Prisma.UsersCreateInput): Promise<Users> {
    return await this.prisma.users.create({
      data: userData,
    });
  }

  async findByEmail(where: Prisma.UsersWhereUniqueInput): Promise<Users|null> {
    return await this.prisma.users.findUnique({
      where,
    });
  }

  async activateUser(id: string): Promise<Users> {
    return await this.prisma.users.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });
  }
}
