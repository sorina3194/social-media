import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';

import mikroOrmConfig from '../mikro-orm.config';
import { logger, requestLogger } from './lib/logger';
import { AppModule } from './modules/app.module';

const PgSessionStore = connectPgSimple(session);
const corsHeaders = ['Origin', 'X-Requested-With', 'Cache-Control', 'Content-Type', 'Accept'];

async function main() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger });

  app.enableShutdownHooks();
  app.enableCors({
    credentials: true,
    origin: true,
    allowedHeaders: corsHeaders,
    exposedHeaders: corsHeaders,
  });

  app.use(requestLogger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards();

  app.set('trust proxy', 1);

  app.use(
    session({
      store: new PgSessionStore({
        createTableIfMissing: true,
        conString: `postgres://${mikroOrmConfig.user!}:${mikroOrmConfig.password}@${mikroOrmConfig.host!}:${mikroOrmConfig.port!}/${mikroOrmConfig.dbName}`,
        tableName: 'session',
      }),
      secret: 'very-secret-session-token',
      resave: false,
      saveUninitialized: false,
      unset: 'keep',
      cookie: { maxAge: 60 * 60 * 1000, secure: false, sameSite: 'none', httpOnly: false },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Social media')
    .addCookieAuth(
      'session',
      {
        type: 'apiKey',
        in: 'cookie',
        name: 'session',
        description: 'Authentication is performed using a session cookie.',
      },
      'session',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  await app.listen(3000);
}

main();
