import { Request, Response } from 'express';
import { Terminal } from 'nestjs-cls';

import { AbstractUserDocument } from '@/modules/user/entity/AbstractUser';
import { User } from '@/modules/user/user.entity';

declare module 'nestjs-cls' {
  interface ClsStore {
    user?: Terminal<User>;
    req: Terminal<Request>;
    res: Terminal<Response>;
  }
}
