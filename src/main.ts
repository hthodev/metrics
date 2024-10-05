import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  let originAllow;
  if (process.env.ENV === 'production') {
    originAllow = process.env.CLIENT_URL;
  } else {
    originAllow = 'http://localhost:5000';
  }
  app.enableCors({
    origin: originAllow,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  
  await app.listen(3000);
}
bootstrap();
