import { inject } from "inversify";
import "reflect-metadata";
import TYPES from "../../types";
import { Request, Response } from "express";
import { IUserController } from "../controllers/interfaces/IUserController";
import { IPostController } from "../controllers/interfaces/IPostController";

export class Routes {

    private readonly _postController: IPostController;
    private readonly _userController: IUserController;

    public constructor(
        @inject(TYPES.IPostController) postController: IPostController,
        @inject(TYPES.IUserController) userController: IUserController
    ) {
        if (!postController) {
            throw new Error("PostController can not be null!")
        }
        if (!userController) {
            throw new Error("UserController can not be null!")
        }

        this._postController = postController;
        this._userController = userController;
    }

    public routes(app): void {

        // GET Home page
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: "GET request successfulll!!!!"
                })
            });

        // GET All posts of a user
        app.route("/api/users/:username/posts")
            .get((req, res, next) => {
                this._postController.getAllPostsForUser(req, res, next);
            });

        // GET All users
        app.route("/api/users")
            .get((req, res, next) => {
                this._userController.getAllUsers(req, res, next);
            });

        // GET All posts of everyone
        app.route("/api/posts")
            .get((req, res, next) => {
                this._postController.getAllPosts(req, res, next);
            });

        // POST Creates a post for a user
        app.route("/api/users/posts")
            .post((req, res, next) => {
                this._postController.createPostForUser(req, res, next)
            });

        // POST Logs a user into the system an returns JWT
        // /api/login

        // POST register a user into the system
        app.route("/api/register")
            .post((req, res, next) =>
                this._userController.registerUser(req, res, next));
    }
}