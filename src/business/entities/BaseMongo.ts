import { Document } from "mongoose"

export abstract class BaseMongo extends Document {
   
    createdAt: Date
   
    updatedAt: Date
}