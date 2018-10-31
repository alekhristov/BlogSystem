import { NextFunction, Request, Response } from "express-serve-static-core";
import { inject, injectable } from "inversify";

import { IUserController } from "./interfaces/IUserController";
import { IUserService } from "../services/interfaces/IUserService";
import TYPES from "../types";
import { User } from "../models/User";

@injectable()
export class UserController implements IUserController {

    private readonly _userService: IUserService;

    constructor(
        @inject(TYPES.IUserService) userService: IUserService
    ) {
        if (!userService) {
            throw new Error("UserService can not be null!")
        }

        this._userService = userService;
    }

    public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let responseStatus: number = 0;
            let responseData = {};

            let newUser = new User(req.body);
            await this._userService.registerUserInDb(newUser);
            responseStatus = 201;
            responseData = newUser;

            res.status(responseStatus).json(responseData);

        } catch (error) {
            res.status(500).json(error.message);
        }
    };

    // public async getUserIdByUsername(req: Request, res: Response, next: NextFunction): Promise<string> {
    //     try {
    //         const user = await this.userService.getUserByUsernameFromDb(req.body.username);

    //         console.log(user.id);
    //         return user.id;
    //     } catch (error) {
    //         throw (error);
    //     }
    // };

    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let responseStatus: number = 0;
            let responseData = {};

            const users = await this._userService.getAllUsersFromDb();

            if (!users) {
                responseStatus = 401;
            } else if (users.length === 0) {
                responseStatus = 200;
                throw new Error("There is no posts yet!")
            }
            responseStatus = 200;
            responseData = users;

            res.status(responseStatus).json(responseData);
        } catch (error) {
            res.status(500).json(error.message)
        }
    };

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        
        res.status(200).json(req.user);

        return next;
    };
}