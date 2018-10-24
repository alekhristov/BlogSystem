import * as mongoose from "mongoose";
import { postSchema, IPostModel, Post } from "../models/postModel";
import { Request, Response } from "express";
import { UserService } from "./userService";

export class PostService {

    public userService: UserService = new UserService();

    public async getAllPostsFromDb(): Promise<IPostModel[]> {
        return Post.find({}).exec();
    };

    public async getAllPostsForUserFromDb(req: Request, res: Response): Promise<void> {

        try {
            const userId = await this.userService.getUserByUsernameFromDb(req.body.username);
            const allPostsForUser = await Post.find({ "author": userId }).exec();

            res.status(200).send(allPostsForUser);

        } catch (error) {
            res.status(400).send(error);
        }
    };

    public async createPostForUserInDb(newPost: IPostModel): Promise<void> {
        newPost.save();
        // let newPost = new Post(req.body);

        // newPost.save((err, post) => {
        //     if (err) {
        //         res.send(err);
        //     }
        //     res.json(post);
        // });
    };
}