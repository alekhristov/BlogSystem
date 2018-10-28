import { Document, Schema, Model, model} from "mongoose";
import { IPost } from "./interfaces/IPost";

export interface IPostModel extends IPost, Document {};

export const postSchema = new Schema({
    created_date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        minlength: 3,
        maxlength: 1000,
        description: "Must be between 3 and 1000 characters",
        required: true
    },
    title: {
        type: String,
        minlength: 3,
        maxlength: 25,
        description: "Must be between 3 and 25 characters",
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Post: Model<IPostModel> = model<IPostModel>("Post", postSchema);
