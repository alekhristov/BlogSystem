import { injectable, inject } from "inversify";
import "reflect-metadata";
import TYPES from "../../types";
import { Post } from "../models/postModel";
import { Request, Response } from "express";
import { NextFunction } from "connect";
import { IPostService } from "src/services/interfaces/IPostService";
import { IUserService } from "src/services/interfaces/IUserService";

@injectable()
export class PostController {

    private readonly _postService : IPostService;
    private readonly _userService : IUserService;

    public constructor(
        @inject(TYPES.IPostService) postService: IPostService,
        @inject(TYPES.IUserService) userService: IUserService
    ) {
        if (!postService){
            throw new Error("PostService can not be null!")
        }
        if (!userService){
            throw new Error("UserService can not be null!")
        }

        this._postService = postService;
        this._userService = userService;
    }

    public async getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let responseStatus: number = 0;
            let responseData = {};

            const posts = await this._postService.getAllPostsFromDb();

            if (!posts || posts.length === 0) {
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

            const user = await this._userService.getUserByUsernameFromDb(req.params.username);

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
            await this._postService.createPostForUserInDb(newPost);
            responseStatus = 200;
            responseData = newPost;

            res.status(responseStatus).json(responseData);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
}