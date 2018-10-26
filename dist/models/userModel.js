"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
;
exports.userSchema = new mongoose_1.Schema({
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
exports.userSchema.pre("save", function (next) {
    let user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});
exports.User = mongoose_1.model("User", exports.userSchema);
//# sourceMappingURL=userModel.js.map