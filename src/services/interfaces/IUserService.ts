import { IUserModel } from "../../models/User";
import { IUser } from "../../models/interfaces/IUser";
import { Request, Response, NextFunction } from "express-serve-static-core";

export interface IUserService {
    registerUserInDb(newUser: IUserModel): Promise<void>
    getUserByUsernameFromDb(username: string): Promise<IUserModel>
    getAllUsersFromDb(): Promise<IUserModel[]>
    loginUser(req: Request, res: Response, next: NextFunction): Promise<void>
}