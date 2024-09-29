"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const image_repository_1 = require("./Mongo/Repositories/image.repository");
const image_dto_1 = require("./DTO/image-dto/image-dto");
let ImagesService = class ImagesService {
    constructor(repository) {
        this.repository = repository;
    }
    async saveFile(file) {
        const uploadDir = path.join(__dirname, '../../src/images/uploads');
        const uploadPath = path.join(uploadDir, file.originalname);
        const validExtensions = /\.(jpg|jpeg|png|gif)$/i;
        if (!file.originalname.match(validExtensions)) {
            throw new common_1.BadRequestException('Only image files (jpg, jpeg, png, gif) are allowed');
        }
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        fs.writeFileSync(uploadPath, file.buffer);
        const brandName = file.originalname;
        const currentTime = new Date();
        await this.repository.uploadFile(brandName, currentTime);
        const responseDto = new image_dto_1.ImageDto(brandName, currentTime);
        responseDto.message = 'File uploaded successfully';
        responseDto.path = uploadPath;
        const records = await this.repository.getAllRecords();
        responseDto.allRecords = records.map((record) => new image_dto_1.ImageDto(record.brandName, record.timestamp));
        return responseDto;
    }
    async findAll() {
        const records = await this.repository.getAllRecords();
        return records.map((record) => new image_dto_1.ImageDto(record.brandName, record.timestamp));
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [image_repository_1.ImageRepository])
], ImagesService);
//# sourceMappingURL=images.service.js.map