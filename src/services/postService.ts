import { IPostModel, Post } from "../models/Post";

import { IPostService } from "./interfaces/IPostService";
import { injectable } from "inversify";

@injectable()
export class PostService implements IPostService {

    public async getAllPostsFromDb(): Promise<IPostModel[]> {
        return Post.find({}).exec();
    };

    public async createPostForUserInDb(newPost: IPostModel): Promise<void> {
        await newPost.save();
        console.log("Post saved successfully!")
    };
}