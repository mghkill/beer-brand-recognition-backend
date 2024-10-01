import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  console.log("port", port)

  const tz = configService.get('TZ');
  console.log("TZ", tz)

  app.enableCors();  
  await app.listen(3333);
}


bootstrap();