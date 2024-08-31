import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import mikroOrmConfig from '../../mikro-orm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        setup(cls, req, res) {
          cls.set('req', req);
          cls.set('res', res);
        },
      },
    }),
    MikroOrmModule.forRoot({ ...mikroOrmConfig, autoLoadEntities: true }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
