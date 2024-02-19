import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppModule } from './app/app-module';
import { PORT } from './common/common-constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors({
    origin: [/https?:\/\/localhost:[\d]{4}/],
  });
  await app.listen(PORT, '0.0.0.0');
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
}

void bootstrap();
