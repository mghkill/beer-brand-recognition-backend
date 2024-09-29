export class ImageDto {  
  brandName: string;  
  timestamp: Date;  
  path?: string;  
  message?: string;  
  allRecords?: ImageDto[];  

  constructor(brandName: string, timestamp: Date) {  
      this.brandName = brandName;  
      this.timestamp = timestamp;  
  }  
}