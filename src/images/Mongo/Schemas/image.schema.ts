import { Schema } from 'mongoose';
export const ImageSchema = new Schema({
  brandName: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
