"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
exports.userSchema = new mongoose_1.Schema({
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
    }
});
exports.User = mongoose_1.model("User", exports.userSchema);
//# sourceMappingURL=userModel.js.map