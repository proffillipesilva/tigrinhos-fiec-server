import { Document } from "mongoose";

export abstract class BaseMongoose extends Document {
 
    createdAt: Date
    updateAt: Date
}