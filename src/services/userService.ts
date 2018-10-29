import { IUserModel, User } from "../models/User";
import { NextFunction, Request, Response } from "express-serve-static-core";

import { IUserService } from "./interfaces/IUserService";
import { authLocal } from "../auth/passport";
import { injectable } from "inversify";

@injectable()
export class UserService implements IUserService {

    public async registerUserInDb(newUser: IUserModel): Promise<void> {
        await newUser.save();
        console.log("User registered successfully!")
    };

    public async getUserByUsernameFromDb(username: string): Promise<IUserModel> {
        return await User.findOne({ "username": username }).exec();
    };

    public async getAllUsersFromDb(): Promise<IUserModel[]> {
        return User.find({}).exec();
    };

    public async loginUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        return authLocal(req, res, next);
    };
}