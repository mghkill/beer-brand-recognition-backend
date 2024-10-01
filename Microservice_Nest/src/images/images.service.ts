import { BadRequestException, Injectable } from '@nestjs/common';

import { ImageRepository } from './Mongo/Repositories/image.repository';
import { ImageDto } from './DTO/image-dto/image-dto';
import axios from 'axios';
import { beerBrands } from './infoData';
import * as FormData from 'form-data';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class ImagesService {
  constructor(private readonly repository: ImageRepository) {}

  async saveFile(file: Express.Multer.File): Promise<ImageDto> {
    const validExtensions = /\.(jpg|jpeg|png|gif)$/i;
    const maxLength = 15;
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
      const response = await axios.post('http://api:5000/upload', formData);
      responseText = response.data.Text;
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
      (resultado.length === 0 &&
        responseText.trim() === '' &&
        'Brand not found');

    const supabaseURL = 'https://pkwecyieexdvzwohouog.supabase.co';
    const supabaseKEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrd2VjeWllZXhkdnp3b2hvdW9nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNzczODgyNywiZXhwIjoyMDQzMzE0ODI3fQ.xNZs4EktaE3fCJKCDjsU7473gA93NXxpRTGuWmzPhYc';

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const dataInfoSuap = await supabase.storage
      .from('imagesUploadBucket')
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });

    const imageUrl = supabase.storage
      .from('imagesUploadBucket')
      .getPublicUrl(dataInfoSuap.data.path, {});

    const currentTime = new Date();

    const image = await this.repository.uploadFile(
      brandName,
      currentTime,
      imageUrl.data.publicUrl,
    );

    const responseDto = new ImageDto(
      undefined,
      brandName,
      currentTime,
      imageUrl.data.publicUrl,
    );

    /* Set Class no DTO */
    responseDto.message = 'File uploaded successfully';
    responseDto.textImage = responseText;
    

    const records = await this.repository.getAllRecords();
    responseDto.allRecords = records.map(
      (record) =>
        new ImageDto(
          record.id,
          record.brandName,
          record.timestamp,
          record.file
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
