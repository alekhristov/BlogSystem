import { NextFunction, Request, Response } from "express-serve-static-core";

export interface IUserController {
    registerUser(req: Request, res: Response, next: NextFunction): Promise<void>
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>
    loginUser(req: Request, res: Response, next: NextFunction)
}