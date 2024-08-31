import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager,
    private readonly cls: ClsService,
  ) {}

  async signUp(dto: SignUpDto) {
    const user = await this.em.create(User, dto);
    await this.em.persist(user).flush();
    return user.id;
  }

  async signIn(dto: SignInDto) {
    const user = await this.em.findOne(User, { username: dto.username });

    if (!user || user.password !== dto.password) {
      throw new UnauthorizedException();
    }

    const req = this.cls.get('req');

    if (req?.session) {
      req.session.userId = user.id;
      // await new Promise((resolve, reject) => {
      //   req.session.save((err) => (err ? reject(err) : resolve(undefined)));
      // });
    }
  }

  async signOut() {
    const req = this.cls.get('req');

    if (!req.session) {
      return;
    }

    await new Promise((resolve, reject) => {
      req.session.destroy((err) => (err ? reject(err) : resolve(undefined)));
    });
  }

  async getMe() {
    const req = this.cls.get('req');

    if (!req?.session?.userId) {
      throw new UnauthorizedException();
    }

    const userId = req.session.userId;
    const user = await this.em.findOne(User, { id: userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
