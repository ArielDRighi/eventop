import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { auth } from 'express-openid-connect';
import { auth0Config } from './config/auth0_config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Eventop')
    .setDescription('PF Soy Henry Grupo 1')
    .setVersion('1.0')
    .addTag('eventop')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(
    auth({
      ...auth0Config,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
