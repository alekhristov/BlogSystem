"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
exports.postSchema = new mongoose_1.Schema({
    created_date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        minlength: 3,
        maxlength: 1000,
        description: "Must be between 3 and 1000 characters",
        required: true
    },
    title: {
        type: String,
        minlength: 3,
        maxlength: 25,
        description: "Must be between 3 and 25 characters",
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.Post = mongoose_1.model("Post", exports.postSchema);
//# sourceMappingURL=postModel.js.map