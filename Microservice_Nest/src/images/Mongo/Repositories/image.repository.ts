import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Image } from '../Interfaces/image.interfaces';

@Injectable()
export class ImageRepository {
  constructor(
    @InjectModel('image') private readonly imageModel: Model<Image>,
  ) {}

  async uploadFile(brandName: string, timestamp: Date, fileBuffer: string): Promise<Image> {
    const record = new this.imageModel({ brandName, timestamp, file: fileBuffer });
    
    return await record.save();
  }

  async getAllRecords(): Promise<Image[]> {
    return await this.imageModel.find().exec();
  }
  
}
