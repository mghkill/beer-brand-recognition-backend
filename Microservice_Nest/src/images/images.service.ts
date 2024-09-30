import { BadRequestException, Injectable } from '@nestjs/common';
const fs = require("fs");
const path = require("path");
import { ImageRepository } from './Mongo/Repositories/image.repository';
import { ImageDto } from './DTO/image-dto/image-dto';
import axios from 'axios';
import { beerBrands } from './infoData';
import * as FormData from 'form-data';

@Injectable()
export class ImagesService {
  constructor(private readonly repository: ImageRepository) {}


  async saveFile(file: Express.Multer.File): Promise<ImageDto> {
    const validExtensions = /\.(jpg|jpeg|png|gif)$/i;
    let responseText: any;

    if (!file.originalname.match(validExtensions)) {
      throw new BadRequestException(
        'Only image files (jpg, jpeg, png, gif) are allowed',
      );
    }

    const formData = new FormData();
    formData.append('file', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/upload',
        formData,
      );
      responseText = response.data.Text;
      console.log(responseText)
    } catch (error) {
      console.error(
        'Erro ao fazer upload:',
        error.response?.data || error.message,
      );
    }

    const resultado = beerBrands.filter((marca) =>
      new RegExp(marca, 'i').test(responseText),
    );

 

 
   const brandName =
     (resultado.length > 0 && resultado[0]) ||
     (resultado.length === 0 && responseText.trim() !== '' && responseText) ||
     (resultado.length === 0 && responseText.trim() === '' && 'Brand not found');

    const currentTime = new Date();

    const image = await this.repository.uploadFile(
      brandName,
      currentTime,
      file.buffer,
    );
    console.log(image)

    const responseDto = new ImageDto(
      undefined,
      brandName,
      currentTime,
      file.buffer,
    );

    /* Set Class no DTO */
    responseDto.message = 'File uploaded successfully';
    responseDto.textImage = responseText;
    responseDto.file = await this.repository.getFile(brandName, currentTime);

    const records = await this.repository.getAllRecords();
    responseDto.allRecords = records.map(
      (record) =>
        new ImageDto(
          record.id,
          record.brandName,
          record.timestamp,
          record.file,
        ),
    );

    return responseDto;
  }

  async findAll(): Promise<ImageDto[]> {
    const records = await this.repository.getAllRecords();
    const responseDto = records.map(
      (record) =>
        new ImageDto(
          record.id,
          record.brandName,
          record.timestamp,
          record.file,
        ),
    );
    return responseDto;
  }
}
