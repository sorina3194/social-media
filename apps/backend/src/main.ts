import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { logger, requestLogger } from './lib/logger';
import { AppModule } from './modules/app.module';

async function main() {
  const app = await NestFactory.create(AppModule, { logger });

  const config = new DocumentBuilder().setTitle('Social media').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('openapi', app, document);

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());

  app.use(requestLogger);

  await app.listen(3000);
}

main();
