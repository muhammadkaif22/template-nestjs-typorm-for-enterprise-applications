import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger config
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest Template')
    .setDescription('')
    .setVersion('1.0')
    .build();

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

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(appPort, () => {
    console.log(`You Applications is Working ->${appPort}<-`);
  });
}
bootstrap();
