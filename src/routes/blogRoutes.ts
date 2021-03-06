import { authJwt, authLocal } from "../auth/passport";
import { inject, injectable } from "inversify";

import { IPostController } from "../controllers/interfaces/IPostController";
import { IUserController } from "../controllers/interfaces/IUserController";
import TYPES from "../types";

@injectable()
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
        app.route("/")
            .get((req, res, next) => {
                res.status(200).send({
                    message: "GET request successfulll!!!!"
                })
            });

        // GET All posts of a user
        app.route("/api/users/:username/posts")
            .get(authJwt, (req, res, next) => {
                this._postController.getAllPostsForUser(req, res, next);
            });

        // GET All users
        app.route("/api/users")
            .get(authJwt, (req, res, next) => {
                this._userController.getAllUsers(req, res, next);
            });

        // GET All posts of everyone
        app.route("/api/posts")
            .get(authJwt, (req, res, next) => {
                this._postController.getAllPosts(req, res, next);
            });

        // POST Creates a post for a user
        app.route("/api/users/posts")
            .post((req, res, next) => {
                this._postController.createPostForUser(req, res, next)
            });

        // POST Logs a user into the system an returns JWT
        app.route("/api/login")
            .post(authLocal, this._userController.loginUser);

        app.route("/jwt/test")
            .get(authJwt, (req, res, next) => {
                res.send("This is а private route");
            });

        // POST register a user into the system
        app.route("/api/register")
            .post((req, res, next) => {
                this._userController.registerUser(req, res, next)
            });
    }
}