import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setVersion('0.1')
    .setTitle('Nest js Template')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // ? api docs apis goes like https://domain/api-docs
  SwaggerModule.setup('api-docs', app, document);
};
