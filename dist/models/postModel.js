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
        min: [3, "You need to enter at least 3 characters"],
        max: [1000, "You can not enter more than 1000 characters"],
        required: true
    },
    title: {
        type: String,
        min: [3, "You need to enter at least 3 characters"],
        max: [25, "You can not enter more than 25 characters"],
        required: true
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
});
exports.Post = mongoose_1.model("Post", exports.postSchema);
//# sourceMappingURL=postModel.js.map