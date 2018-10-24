"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const postController_1 = require("../controllers/postController");
class Routes {
    constructor() {
        this.userController = new userController_1.UserController();
        this.postController = new postController_1.PostController();
    }
    routes(app) {
        // GET Home page
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });
        // GET All posts of a user
        // app.route("/api/users/:username/posts")
        //     .get(this.postController.getAllPostsForUser);
        // TEST
        app.route("/test")
            .get(this.userController.getUserIdByUsername);
        // GET All users
        app.route("/api/users")
            .get(this.userController.getAllUsers);
        // GET All posts of everyone
        app.route("/api/posts")
            .get(this.postController.getAllPosts);
        // POST Creates a post for a user
        app.route("/api/users/posts")
            .post(this.postController.createPostForUser);
        // POST Logs a user into the system an returns JWT
        // /api/login
        // POST register a user into the system
        app.route("/api/register")
            .post(this.userController.registerUser);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=blogRoutes.js.map