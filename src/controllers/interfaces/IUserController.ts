import { NextFunction } from "express-serve-static-core";

export interface IUserController {
    registerUser(req: Request, res: Response, next: NextFunction): Promise<void>
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>

}