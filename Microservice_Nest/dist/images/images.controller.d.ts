import { ImagesService } from './images.service';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    uploadFile(file: Express.Multer.File): Promise<import("./DTO/image-dto/image-dto").ImageDto>;
    findAll(): Promise<import("./DTO/image-dto/image-dto").ImageDto[]>;
}
