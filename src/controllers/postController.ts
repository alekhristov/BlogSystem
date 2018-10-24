import * as mongoose from "mongoose";
import { postSchema, Post } from "../models/postModel";
import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { NextFunction } from "connect";


export class PostController {

    public postService: PostService = new PostService();

    public async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const posts = await this.postService.getAllPostsFromDb();
            if (posts.length > 0) {
                return res.status(200).send(posts);
            }

            res.status(404).send();
        } catch (error) {
            return res.status(500).send(error)
        }
    };

    public getAllPostsForUser() {
        this.postService.getAllPostsForUserFromDb;
    };

    public async createPostForUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let newPost = new Post(req.body);
            this.postService.createPostForUserInDb(newPost);
            
            res.status(200).json(newPost);
        } catch (error) {
            res.status(400).send(error);
        }
    };
}