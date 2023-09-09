import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  //app.enableCors({ origin: "http://localhost:4000" })//, credentials: true // do te thote qe po marim dhe po cojme cookie, dhe ne Controller hiqet  passthrough: true ne Request
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3000);
}
bootstrap();