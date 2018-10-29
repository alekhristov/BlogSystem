"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../types");
const passport_1 = require("../auth/passport");
let Routes = class Routes {
    constructor(postController, userController) {
        if (!postController) {
            throw new Error("PostController can not be null!");
        }
        if (!userController) {
            throw new Error("UserController can not be null!");
        }
        this._postController = postController;
        this._userController = userController;
    }
    routes(app) {
        // GET Home page
        app.route('/')
            .get((req, res, next) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });
        // GET All posts of a user
        app.route("/api/users/:username/posts")
            .get(passport_1.authJwt, (req, res, next) => {
            this._postController.getAllPostsForUser(req, res, next);
        });
        // GET All users
        app.route("/api/users")
            .get(passport_1.authJwt, (req, res, next) => {
            this._userController.getAllUsers(req, res, next);
        });
        // GET All posts of everyone
        app.route("/api/posts")
            .get(passport_1.authJwt, (req, res, next) => {
            this._postController.getAllPosts(req, res, next);
        });
        // POST Creates a post for a user
        app.route("/api/users/posts")
            .post((req, res, next) => {
            this._postController.createPostForUser(req, res, next);
        });
        // POST Logs a user into the system an returns JWT
        app.post("/api/login", passport_1.authLocal, this._userController.loginUser);
        app.get("/jwt/test", passport_1.authJwt, (req, res, next) => {
            res.send("This is а private route");
        });
        // POST register a user into the system
        app.route("/api/register")
            .post((req, res, next) => this._userController.registerUser(req, res, next));
    }
};
Routes = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.IPostController)),
    __param(1, inversify_1.inject(types_1.default.IUserController)),
    __metadata("design:paramtypes", [Object, Object])
], Routes);
exports.Routes = Routes;
//# sourceMappingURL=blogRoutes.js.map