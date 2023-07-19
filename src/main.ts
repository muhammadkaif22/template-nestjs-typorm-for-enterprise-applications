import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { config } from 'dotenv';

async function bootstrap() {
  // config();

  const app = await NestFactory.create(AppModule);

  // validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove the field that are not in Dto
      forbidNonWhitelisted: true, // throw an error is field does not exits in dto
    }),
  );

  // app port
  const appPort = process.env.APP_PORT;

  // enable cors
  app.enableCors();

  await app.listen(appPort, () => {
    console.log(`You Applications is Working ->${appPort}<-`);
  });
}
bootstrap();
