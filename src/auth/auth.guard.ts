import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserRepository } from '../repository/user/user.repository';
import { AppError } from '../utils/app.erro';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,

    private user: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const UnauthorizedUser = 'Unauthorized user.';

    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new AppError(UnauthorizedUser, 401);
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const existsUser = await this.user.getUniqueById({ id: payload.id });
      if (!existsUser) {
        throw new AppError(UnauthorizedUser, 401);
      }

      if (existsUser.email !== payload.email) {
        throw new AppError(UnauthorizedUser, 401);
      }

      request['user'] = payload;
      return true;

    } catch (error) {
      throw new AppError(UnauthorizedUser, 401);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
