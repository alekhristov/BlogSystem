import * as mongoose from "mongoose";
import { userSchema, User, IUserModel } from "../models/userModel";
import { Request, Response, NextFunction } from "express";

export class UserService {
    public async registerUserInDb(newUser: IUserModel): Promise<void> {
        newUser.save();
        console.log("User registered successfully!")
    };

    public async getUserByUsernameFromDb(username: string): Promise<IUserModel> {
        return await User.findOne({ "username": username }).exec();
    };

    public async getAllUsersFromDb(): Promise<IUserModel[]> {
        return User.find({}).exec();
    };
}