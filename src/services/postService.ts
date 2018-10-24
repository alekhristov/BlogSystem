import { injectable } from "inversify";
import "reflect-metadata";
import { IPostModel, Post } from "../models/postModel";
import { IPostService } from "./interfaces/IPostService";

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