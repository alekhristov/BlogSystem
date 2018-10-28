import { NextFunction, Request, Response } from "express-serve-static-core";
import { inject, injectable } from "inversify";

import { IUserController } from "./interfaces/IUserController";
import { IUserService } from "../services/interfaces/IUserService";
import TYPES from "../types";
import { User } from "../models/User";
import passport = require("passport");

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

            const users = await this._userService.getAllUsersFromDb();

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

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        // passport.authenticate('local', function (err, user, info) {
        //     if (err) { return next(err); }

        //     if (!user) { return res.redirect('/login'); }
        //     req.logIn(user, function (err) {
        //         if (err) { return next(err); }
        //         return res.redirect('/users/' + user.username);
        //     });
        // })(req, res, next);

        res.status(200).json(req.user);

        return next;
    };
}