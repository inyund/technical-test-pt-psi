import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  const cookieSecretKey: string = configService.get('COOKIE_SECRET_KEY') || '';

  if (!cookieSecretKey) {
    throw new Error('COOKIE_SECRET_KEY is not defined');
  } else {
    app.use(cookieParser(cookieSecretKey));
  }
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Technical Test PT PSI')
    .setDescription('NestJS API documentation for Technical Test PT PSI')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, documentFactory);

  app.setGlobalPrefix('api');

  await app.listen(port || 8000);

  return port;
}
bootstrap()
  .then((port) => {
    console.log('Server started. listening on port', port);
  })
  .catch(console.error);
