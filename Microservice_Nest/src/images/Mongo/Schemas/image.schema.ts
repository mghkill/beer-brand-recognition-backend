import { Schema } from 'mongoose';

export const ImageSchema = new Schema({
  brandName: { type: String },
  timestamp: { type: Date, default: Date.now },
  file: { type: Buffer },
  textImage: { type: String }
});