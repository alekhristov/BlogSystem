"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const postModel_1 = require("../models/postModel");
const Post = mongoose.model("Post", postModel_1.postSchema);
class PostController {
    getAllPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield Post.find({}).exec();
                res.status(200).send(posts);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
    // public getAllPostsForUser(req: Request, res: Response) {
    //     Post.find({"Post" : }, (err, posts) => {
    //         if (err) {
    //             res.send(err);
    //         }
    //         res.json(posts);
    //     });
    // }
    createPostForUser(req, res) {
        let newPost = new Post(req.body);
        newPost.save((err, post) => {
            if (err) {
                res.send(err);
            }
            res.json(post);
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=postController.js.map