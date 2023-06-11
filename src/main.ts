import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );
  await app.listen(3000);
}
bootstrap();
