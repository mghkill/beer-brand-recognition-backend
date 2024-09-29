import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ImageRepository } from './Mongo/Repositories/image.repository';
import { ImageDto } from './DTO/image-dto/image-dto';

@Injectable()
export class ImagesService {
  constructor(private readonly repository: ImageRepository) {}

  async saveFile(file: Express.Multer.File): Promise<ImageDto> {
    const uploadDir = path.join(__dirname, '../../src/images/uploads');
    const uploadPath = path.join(uploadDir, file.originalname);
    const validExtensions = /\.(jpg|jpeg|png|gif)$/i;

    if (!file.originalname.match(validExtensions)) {
      throw new BadRequestException(
        'Only image files (jpg, jpeg, png, gif) are allowed',
      );
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    fs.writeFileSync(uploadPath, file.buffer);

    const brandName = file.originalname;
    const currentTime = new Date();

    await this.repository.uploadFile(brandName, currentTime);

    const responseDto = new ImageDto(brandName, currentTime);
    responseDto.message = 'File uploaded successfully';
    responseDto.path = uploadPath;

    const records = await this.repository.getAllRecords();
    responseDto.allRecords = records.map(
      (record) => new ImageDto(record.brandName, record.timestamp),
    );

    return responseDto;
  }

  async findAll(): Promise<ImageDto[]> {
    const records = await this.repository.getAllRecords();
    return records.map(
      (record) => new ImageDto(record.brandName, record.timestamp),
    );
  }
}
