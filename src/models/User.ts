// import { Document, Schema, Model, model } from "mongoose";
// import { IUser } from "./interfaces/IUser";
// import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
require("dotenv").config();

// export interface IUserModel extends IUser, Document { };

// const userSchema: Schema = new Schema({
//     name: {
//         type: String,
//         trim: true,
//         minlength: 2,
//         maxlength: 20,
//         description: "Must be between 5 and 20 characters",
//         required: "Enter name"
//     },
//     username: {
//         type: String,
//         trim: true,
//         unique: true,
//         lowercase: true,
//         minlength: 2,
//         maxlength: 20,
//         description: "Must be between 5 and 20 characters",
//         required: "Enter username"
//     },
//     password: {
//         type: String,
//         trim: true,
//         required: "Enter password"
//     },
//     email: {
//         type: String,
//         trim: true,
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, "Please fill a valid email address"]
//     }
// });

// //hashing a password before saving it to the database
// userSchema.pre("save", (next) => {
//     let user = this;

//     bcrypt.hash(user.password, 10, (err, hash) => {
//         if (err) {
//             return next(err.message);
//         }

//         user.password = hash;
//         next();
//     })
// });

// userSchema.methods = {
//     async isValidPassword(password, user): Promise<boolean> {
//         //     //Hashes the password sent by the user for login and checks if the hashed password stored in the 
//         //     //database matches the one sent. Returns true if it does else false.
//         return await bcrypt.compare(password, user.password);
//     },
//     // createToken() {
//     //     return jwt.sign(
//     //         {
//     //             _id: this._id,
//     //         },
//     //         process.env.JWT_SECRET,
//     //     );
//     // },
//     // toJSON() {
//     //     return {
//     //         _id: this._id,
//     //         username: this.username,
//     //         token: `JWT ${this.createToken()}`,
//     //     };
//     // }
// };

// // export const User: IUserModel = <IUserModel>model<IUser>("User", userSchema);
// export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);
import { Document, Schema, Model, model } from "mongoose";
import { IUser } from "./interfaces/IUser";
import bcrypt = require("bcrypt");

export interface IUserModel extends IUser, Document { };

const userSchema: any = new Schema({
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
userSchema.pre('save', function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

userSchema.methods = {
    async isValidPassword(password, user): Promise<boolean> {
        //     //Hashes the password sent by the user for login and checks if the hashed password stored in the 
        //     //database matches the one sent. Returns true if it does else false.
        return await bcrypt.compare(password, user.password);
    },
    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            process.env.JWT_SECRET,
        );
    },
    toJSON() {
        return {
            _id: this._id,
            username: this.username,
            token: `JWT ${this.createToken()}`,
        };
    }
};
export const User: Model<IUserModel> = model<IUserModel>("User", userSchema);