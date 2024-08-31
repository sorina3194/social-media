import { EntityManager } from '@mikro-orm/postgresql';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';

import { User } from '../user/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly em: EntityManager,
    private readonly cls: ClsService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest() as Request;
    const userId = request.session?.userId;
    console.log({ sessionId: request.session?.id });
    if (!userId) {
      throw new UnauthorizedException();
    }

    const user = await this.em.findOne(User, { id: userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    this.cls.set('user', user);

    return true;
  }
}
