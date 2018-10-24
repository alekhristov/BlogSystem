import { Request, Response, NextFunction } from "express-serve-static-core";

export interface IPostController {
    getAllPosts(req: Request, res: Response, next: NextFunction): Promise<void>
    getAllPostsForUser(req: Request, res: Response, next: NextFunction): Promise<void>
    createPostForUser(req: Request, res: Response, next: NextFunction): Promise<void>    
}