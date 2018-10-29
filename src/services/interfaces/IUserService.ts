import { NextFunction, Request, Response } from "express-serve-static-core";

import { IUserModel } from "../../models/User";

export interface IUserService {
    registerUserInDb(newUser: IUserModel): Promise<void>
    getUserByUsernameFromDb(username: string): Promise<IUserModel>
    getAllUsersFromDb(): Promise<IUserModel[]>
    loginUser(req: Request, res: Response, next: NextFunction): Promise<void>
}