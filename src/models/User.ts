import { Schema, Model, model } from "mongoose";
import { IUser } from "./interfaces/IUser";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export interface IUserModel extends Model<IUser> {
}
export var userSchema: Schema = new Schema({
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
userSchema.pre("save", (next) => {
    let user = this;

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err.message);
        }

        user.password = hash;
        next();
    })
});

userSchema.methods.isValidPassword = async (password, user): Promise<boolean> => {
    //     //Hashes the password sent by the user for login and checks if the hashed password stored in the 
    //     //database matches the one sent. Returns true if it does else false.
    return await bcrypt.compare(password, user.password);
};

userSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt((expirationDate.getTime() / 1000).toString(), 10),
    }, 'secret');
}

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

export const User: IUserModel = <IUserModel>model<IUser>("User", userSchema);