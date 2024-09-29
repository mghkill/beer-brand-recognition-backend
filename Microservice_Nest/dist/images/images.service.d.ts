import { ImageRepository } from './Mongo/Repositories/image.repository';
import { ImageDto } from './DTO/image-dto/image-dto';
export declare class ImagesService {
    private readonly repository;
    constructor(repository: ImageRepository);
    saveFile(file: Express.Multer.File): Promise<ImageDto>;
    findAll(): Promise<ImageDto[]>;
}
