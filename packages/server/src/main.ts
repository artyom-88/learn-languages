import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app-module';
import { APP_DEFAULT_PORT } from './common/common-constants';
import { LoggingInterceptor } from './common/interceptos/logging-interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.enableCors({
    origin: [/https?:\/\/localhost:[\d]{4}/],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
      // https://github.com/nestjs/nest/issues/8562
      validatorPackage: require('@nestjs/class-validator'),
      transformerPackage: require('@nestjs/class-transformer'),
    }),
  );

  const config = new DocumentBuilder().setTitle('Learn Languages API').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.APP_PORT || APP_DEFAULT_PORT);
  const url = await app.getUrl();
  console.log(`Application is running on: ${url}`);
}

void bootstrap();
