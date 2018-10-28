import { IUserModel } from "../../models/User";
import { IUser } from "../../models/interfaces/IUser";
import { Request, Response, NextFunction } from "express-serve-static-core";

export interface IUserService {
    registerUserInDb(newUser: IUser): Promise<void>
    getUserByUsernameFromDb(username: string): Promise<IUser>
    getAllUsersFromDb(): Promise<IUser[]>
    loginUser(req: Request, res: Response, next: NextFunction): Promise<void>
}