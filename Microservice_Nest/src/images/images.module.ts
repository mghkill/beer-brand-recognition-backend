import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ImageRepository } from './Mongo/Repositories/image.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './Mongo/Schemas/image.schema';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/DBImage'),
    MongooseModule.forFeature([{ name: 'image', schema: ImageSchema }]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImageRepository, ConfigService],
})
export class ImagesModule {}
