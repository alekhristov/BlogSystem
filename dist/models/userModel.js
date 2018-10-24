"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
exports.userSchema = new mongoose_1.Schema({
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
        match: "/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;",
    },
    posts: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Post"
        }]
});
exports.User = mongoose_1.model("User", exports.userSchema);
//# sourceMappingURL=userModel.js.map