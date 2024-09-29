import { Module } from '@nestjs/common';
import { ImagesModule } from './images/images.module';
import { ImagesService } from './images/images.service';
import { ImagesController } from './images/images.controller';
import { featureModules } from './images';

@Module({
  imports: [...featureModules],
  controllers: [],
  providers: [],
})
export class AppModule {}
