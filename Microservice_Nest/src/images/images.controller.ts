import {
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.imagesService.saveFile(file);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }
}
