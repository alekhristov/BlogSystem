"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
;
exports.userSchema = new mongoose.Schema({
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
exports.userSchema.pre("save", (next) => {
    let user = this;
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err.message);
        }
        user.password = hash;
        next();
    });
});
exports.userSchema.methods.isValidPassword = (password) => __awaiter(this, void 0, void 0, function* () {
    const user = this;
    //Hashes the password sent by the user for login and checks if the hashed password stored in the 
    //database matches the one sent. Returns true if it does else false.
    const compare = yield bcrypt.compare(password, user.password);
    return compare;
});
exports.User = mongoose.model("User", exports.userSchema);
//# sourceMappingURL=userModel.js.map