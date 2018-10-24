import * as mongoose from "mongoose";
import { postSchema, Post } from "../models/postModel";
import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { NextFunction } from "connect";
import { UserService } from "../services/userService";


export class PostController {

    public postService: PostService = new PostService();
    public userService: UserService = new UserService();

    public async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let responseStatus: number = 0;
            let responseData = {};

            const posts = await this.postService.getAllPostsFromDb();

            if (!posts || posts.length === 0){
                responseStatus = 404;
                throw new Error("There is no posts yet!")
            }
                responseStatus = 200;
                responseData = posts;

                res.status(responseStatus).send(responseData);
        } catch (error) {
            res.status(500).send(error.message)
        }
    };

    public async getAllPostsForUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let responseStatus: number = 0;
            let responseData = {};

            const user = await this.userService.getUserByUsernameFromDb(req.params.username);
            
            if (!user) {
                throw new Error("There is no such user!")
            }

            const userId = user.id;
            const allPostsForUser = await Post.find({ "author": userId }).exec();
            
            if (allPostsForUser.length > 0) {
                responseStatus = 200;
                responseData = allPostsForUser;

            } else {
                responseStatus = 404;
            }

            res.status(responseStatus).send(responseData);
        } catch (error) {
            res.status(404).send(error.message);
        }
    };

    public async createPostForUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let responseStatus: number = 0;
            let responseData = {};

            let newPost = new Post(req.body);
            this.postService.createPostForUserInDb(newPost);
            responseStatus = 200;
            responseData = newPost;

            res.status(responseStatus).json(responseData);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
}