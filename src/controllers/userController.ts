import * as mongoose from "mongoose";
import { userSchema, User, IUserModel } from "../models/userModel";
import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { NextFunction } from "express-serve-static-core";

export class UserController {

    // private readonly _userService: UserService;
    public userService: UserService = new UserService();

    /**
     *
     */
    // constructor(userService: UserService) {
    //     if (!userService) {
    //         console.log("patka");
    //     }
    //     this._userService = userService;
    // }
    public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let responseStatus: number = 0;
            let responseData = {};

            let newUser = new User(req.body);
            await this.userService.registerUserInDb(newUser);
            responseStatus = 200;
            responseData = newUser;

            res.status(responseStatus).json(responseData);

        } catch (error) {
            res.status(500).send(error.message);
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

            const users = await this.userService.getAllUsersFromDb();

            if (!users || users.length === 0) {
                responseStatus = 404;
                throw new Error("There is no users yet!");
            }
            responseStatus = 200;
            responseData = users;

            res.status(responseStatus).json(responseData);
        } catch (error) {
            res.status(404).json(error.message)
        }
    };
}