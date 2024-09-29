import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger;
  await app.listen(3333);
  
  logger.log(`Server Running on port:   ${await app.getUrl() }`)
}
bootstrap();
