import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "./interfaces/IUserModel";

export interface IUserModel extends IUser, Document { };

export const userSchema = new Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 20,
        description: "Must be between 5 and 20 characters",
        required: "Enter name"
    },
    username: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 20,
        description: "Must be between 5 and 20 characters",
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
