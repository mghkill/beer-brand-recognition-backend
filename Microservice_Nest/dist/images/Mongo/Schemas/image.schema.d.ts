import { Schema } from 'mongoose';
export declare const ImageSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    timestamp: NativeDate;
    brandName?: string;
    file?: Buffer;
    textImage?: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    timestamp: NativeDate;
    brandName?: string;
    file?: Buffer;
    textImage?: string;
}>> & import("mongoose").FlatRecord<{
    timestamp: NativeDate;
    brandName?: string;
    file?: Buffer;
    textImage?: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
