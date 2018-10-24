import { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { PostController } from "../controllers/postController";

export class Routes {

    public userController: UserController = new UserController();
    public postController: PostController = new PostController();

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
                this.postController.getAllPostsForUser(req, res, next);
            });

        // GET All users
        app.route("/api/users")
            .get((req, res, next) => {
                this.userController.getAllUsers(req, res, next);
            });

        // GET All posts of everyone
        app.route("/api/posts")
            .get((req, res, next) => {
                this.postController.getAllPosts(req, res, next);
            });

        // POST Creates a post for a user
        app.route("/api/users/posts")
            .post((req, res, next) => {
                this.postController.createPostForUser(req, res, next)
            });

        // POST Logs a user into the system an returns JWT
        // /api/login

        // POST register a user into the system
        app.route("/api/register")
            .post((req, res, next) =>
                this.userController.registerUser(req, res, next));
    }
}