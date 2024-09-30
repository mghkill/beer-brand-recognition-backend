export declare class ImageDto {
    id: string;
    brandName: string;
    timestamp: Date;
    path?: string;
    message?: string;
    allRecords?: ImageDto[];
    textImage?: string;
    file?: Buffer;
    constructor(id: string, brandName: string, timestamp: Date, file: Buffer);
}
