import { Model } from 'mongoose';
import { Image } from '../Interfaces/image.interfaces';
export declare class ImageRepository {
    private readonly imageModel;
    constructor(imageModel: Model<Image>);
    uploadFile(brandName: string, timestamp: Date, fileBuffer: Buffer): Promise<Image>;
    getAllRecords(): Promise<Image[]>;
    getFile(brandName: string, timestamp: Date): Promise<Buffer>;
}
