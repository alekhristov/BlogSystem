import { Document, Schema, Model, model} from "mongoose";
import { IPost } from "./interfaces/post";

export interface IPostModel extends IPost, Document {};

export const postSchema = new Schema({
    created_date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        min: [3, "You need to enter at least 3 characters"],
        max: [1000, "You can not enter more than 1000 characters"],
        required: true
    },
    title: {
        type: String,
        min: [3, "You need to enter at least 3 characters"],
        max: [25, "You can not enter more than 25 characters"],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Post: Model<IPostModel> = model<IPostModel>("Post", postSchema);
