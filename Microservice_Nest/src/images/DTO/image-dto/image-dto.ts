export class ImageDto {
  id: string;
  brandName: string;
  timestamp: Date;
  path?: string;
  message?: string;
  allRecords?: ImageDto[];
  textImage?: string;
  file?: string; 

  constructor(id: string, brandName: string, timestamp: Date, file: string) {
    this.id = id;
    this.brandName = brandName;
    this.timestamp = timestamp;
    this.file = file;
  }
}
