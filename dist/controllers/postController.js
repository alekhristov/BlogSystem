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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../types");
const postModel_1 = require("../models/postModel");
let PostController = class PostController {
    constructor(postService, userService) {
        if (!postService) {
            throw new Error("PostService can not be null!");
        }
        if (!userService) {
            throw new Error("UserService can not be null!");
        }
        this._postService = postService;
        this._userService = userService;
    }
    getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseStatus = 0;
                let responseData = {};
                const posts = yield this._postService.getAllPostsFromDb();
                if (!posts || posts.length === 0) {
                    responseStatus = 404;
                    throw new Error("There is no posts yet!");
                }
                responseStatus = 200;
                responseData = posts;
                res.status(responseStatus).send(responseData);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    ;
    getAllPostsForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseStatus = 0;
                let responseData = {};
                const user = yield this._userService.getUserByUsernameFromDb(req.params.username);
                if (!user) {
                    throw new Error("There is no such user!");
                }
                const userId = user.id;
                const allPostsForUser = yield postModel_1.Post.find({ "author": userId }).exec();
                if (allPostsForUser.length > 0) {
                    responseStatus = 200;
                    responseData = allPostsForUser;
                }
                else {
                    responseStatus = 400;
                    responseData = "The user has no posts yet!";
                }
                res.status(responseStatus).send(responseData);
            }
            catch (error) {
                res.status(404).send(error.message);
            }
        });
    }
    ;
    createPostForUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseStatus = 0;
                let responseData = {};
                let newPost = new postModel_1.Post(req.body);
                yield this._postService.createPostForUserInDb(newPost);
                responseStatus = 200;
                responseData = newPost;
                res.status(responseStatus).json(responseData);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    ;
};
PostController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.IPostService)),
    __param(1, inversify_1.inject(types_1.default.IUserService)),
    __metadata("design:paramtypes", [Object, Object])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=postController.js.map