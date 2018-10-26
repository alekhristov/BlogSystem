import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "./interfaces/IUserModel";
import bcrypt = require("bcrypt");

export interface IUserModel extends IUser, Document { };

export const userSchema: any = new Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 20,
        description: "Must be between 5 and 20 characters",
        required: "Enter name"
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        minlength: 2,
        maxlength: 20,
        description: "Must be between 5 and 20 characters",
        required: "Enter username"
    },
    password: {
        type: String,
        trim: true,
        required: "Enter password"
    },
    email: {
        type: String,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, "Please fill a valid email address"]
    }
});

//hashing a password before saving it to the database
userSchema.pre("save", function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);
