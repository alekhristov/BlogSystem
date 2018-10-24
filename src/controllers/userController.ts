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
            let newUser = new User(req.body);
            this.userService.registerUserInDb(newUser);
            res.status(200).json(newUser);

        } catch (error) {
            res.status(400).send(error);
        }
    };

    public async getUserIdByUsername(req: Request, res: Response, next: NextFunction): Promise<string> {
        try {
            const user = await this.userService.getUserByUsernameFromDb(req.body.username);

            console.log(user.id);
            return user.id;
        } catch (error) {
            throw (error);
        }
    };

    public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const users = await this.userService.getAllUsersFromDb();
            if (users.length > 0) {
                return res.status(200).send(users);
            }

            res.status(404).send();
        } catch (error) {
            return res.status(500).send(error)
        }
    };
}