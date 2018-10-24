import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "./interfaces/user";

export interface IUserModel extends IUser, Document { };

export const userSchema = new Schema({
    name: {
        type: String,
        min: [5, "You need to enter at least 5 characters"],
        max: [20, "You can not enter more than 20 characters"],
        required: "Enter name"
    },
    username: {
        type: String,
        unique: true,
        min: [5, "You need to enter at least 5 characters"],
        max: [20, "You can not enter more than 20 characters"],
        required: "Enter username"
    },
    password: {
        type: String,
        required: "Enter password"
    },
    email: {
        type: String,
        // match: "/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;",
    }
});

export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);
