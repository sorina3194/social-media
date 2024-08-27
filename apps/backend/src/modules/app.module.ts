import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import mikroOrmConfig from '../../mikro-orm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [MikroOrmModule.forRoot({ ...mikroOrmConfig, autoLoadEntities: true }), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
