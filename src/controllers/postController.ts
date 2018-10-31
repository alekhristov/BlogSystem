import { NextFunction, Request, Response } from "express-serve-static-core";
import { inject, injectable } from "inversify";

import { IPostController } from "./interfaces/IPostController";
import { IPostService } from "../services/interfaces/IPostService";
import { IUserService } from "../services/interfaces/IUserService";
import { Post } from "../models/Post";
import TYPES from "../types";

@injectable()
export class PostController implements IPostController {

    private readonly _postService: IPostService;
    private readonly _userService: IUserService;

    public constructor(
        @inject(TYPES.IPostService) postService: IPostService,
        @inject(TYPES.IUserService) userService: IUserService
    ) {
        if (!postService) {
            throw new Error("PostService can not be null!")
        }
        if (!userService) {
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

            if (!posts) {
                responseStatus = 401;
            } else if (posts.length === 0) {
                responseStatus = 200;
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
                responseStatus = 401;
                throw new Error("There is no such user!")
            }

            const userId = user.id;
            const allPostsForUser = await Post.find({ "author": userId }).exec();

            if (allPostsForUser.length > 0) {
                responseStatus = 200;
                responseData = allPostsForUser;

            } else {
                responseStatus = 200;
                responseData = "The user has no posts yet!";
            }

            res.status(responseStatus).send(responseData);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    public async createPostForUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let responseStatus: number = 0;
            let responseData = {};

            let newPost = new Post(req.body);
            await this._postService.createPostForUserInDb(newPost);
            responseStatus = 201;
            responseData = newPost;

            res.status(responseStatus).json(responseData);
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
}