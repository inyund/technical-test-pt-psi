import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const cookieSecretKey: string = configService.get('COOKIE_SECRET_KEY') || '';
  if (!cookieSecretKey) {
    throw new Error('COOKIE_SECRET_KEY is not defined');
  } else {
    app.use(cookieParser(cookieSecretKey));
  }
  app.setGlobalPrefix('api');
  await app.listen(port || 8000);
  return port;
}
bootstrap()
  .then((port) => console.log('Server started. listening on port', port))
  .catch(console.error);
