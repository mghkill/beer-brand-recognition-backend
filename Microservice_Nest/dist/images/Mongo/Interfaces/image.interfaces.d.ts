import mongoose, { Document } from 'mongoose';
export interface Image extends Document {
    readonly _id: mongoose.Schema.Types.ObjectId;
    brandName: string;
    timestamp: Date;
    file: Buffer;
}
