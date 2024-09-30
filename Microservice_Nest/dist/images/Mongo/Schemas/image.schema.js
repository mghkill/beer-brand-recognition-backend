"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ImageSchema = new mongoose_1.Schema({
    brandName: { type: String },
    timestamp: { type: Date, default: Date.now },
    file: { type: Buffer },
    textImage: { type: String }
});
//# sourceMappingURL=image.schema.js.map