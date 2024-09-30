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
const axios_1 = require("axios");
const infoData_1 = require("./infoData");
const FormData = require("form-data");
let ImagesService = class ImagesService {
    constructor(repository) {
        this.repository = repository;
    }
    async saveFile(file) {
        const validExtensions = /\.(jpg|jpeg|png|gif)$/i;
        let responseText;
        if (!file.originalname.match(validExtensions)) {
            throw new common_1.BadRequestException('Only image files (jpg, jpeg, png, gif) are allowed');
        }
        const formData = new FormData();
        formData.append('file', file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype,
        });
        try {
            const response = await axios_1.default.post('http://api:5000/upload', formData);
            responseText = response.data.Text;
            console.log(responseText);
        }
        catch (error) {
            console.error('Erro ao fazer upload:', error.response?.data || error.message);
        }
        const resultado = infoData_1.beerBrands.filter((marca) => new RegExp(marca, 'i').test(responseText));
        const brandName = (resultado.length > 0 && resultado[0]) ||
            (resultado.length === 0 && responseText.trim() !== '' && responseText) ||
            (resultado.length === 0 && responseText.trim() === '' && 'Brand not found');
        const currentTime = new Date();
        const image = await this.repository.uploadFile(brandName, currentTime, file.buffer);
        console.log(image);
        const responseDto = new image_dto_1.ImageDto(undefined, brandName, currentTime, file.buffer);
        responseDto.message = 'File uploaded successfully';
        responseDto.textImage = responseText;
        responseDto.file = await this.repository.getFile(brandName, currentTime);
        const records = await this.repository.getAllRecords();
        responseDto.allRecords = records.map((record) => new image_dto_1.ImageDto(record.id, record.brandName, record.timestamp, record.file));
        return responseDto;
    }
    async findAll() {
        const records = await this.repository.getAllRecords();
        const responseDto = records.map((record) => new image_dto_1.ImageDto(record.id, record.brandName, record.timestamp, record.file));
        return responseDto;
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [image_repository_1.ImageRepository])
], ImagesService);
//# sourceMappingURL=images.service.js.map