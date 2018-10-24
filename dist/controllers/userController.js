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
const userModel_1 = require("../models/userModel");
class UserController {
    registerUser(req, res) {
        let newUser = new userModel_1.User(req.body);
        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
    getUserIdByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield userModel_1.User.findOne(u => u.username === username).exec();
                console.log(user.id);
                return user.id;
            }
            catch (error) {
                throw (error);
            }
        });
    }
    getAllUsers(req, res) {
    }
}
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map