import * as mongoose from "mongoose";
import { postSchema, IPostModel, Post } from "../models/postModel";
import { Request, Response } from "express";
import { UserService } from "./userService";

export class PostService {

    public userService: UserService = new UserService();

    public async getAllPostsFromDb(): Promise<IPostModel[]> {
        return Post.find({}).exec();
    };

    public async createPostForUserInDb(newPost: IPostModel): Promise<void> {
        await newPost.save();
        console.log("Post saved successfully!")
    };
}