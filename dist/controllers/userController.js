"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../types");
const User_1 = require("../models/User");
let UserController = class UserController {
    constructor(userService) {
        if (!userService) {
            throw new Error("UserService can not be null!");
        }
        this._userService = userService;
    }
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseStatus = 0;
                let responseData = {};
                let newUser = new User_1.User(req.body);
                yield this._userService.registerUserInDb(newUser);
                responseStatus = 200;
                responseData = newUser;
                res.status(responseStatus).json(responseData);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    ;
    // public async getUserIdByUsername(req: Request, res: Response, next: NextFunction): Promise<string> {
    //     try {
    //         const user = await this.userService.getUserByUsernameFromDb(req.body.username);
    //         console.log(user.id);
    //         return user.id;
    //     } catch (error) {
    //         throw (error);
    //     }
    // };
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let responseStatus = 0;
                let responseData = {};
                const users = yield this._userService.getAllUsersFromDb();
                if (!users || users.length === 0) {
                    responseStatus = 404;
                    throw new Error("There is no users yet!");
                }
                responseStatus = 200;
                responseData = users;
                res.status(responseStatus).json(responseData);
            }
            catch (error) {
                res.status(404).json(error.message);
            }
        });
    }
    ;
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // passport.authenticate('local', function (err, user, info) {
            //     if (err) { return next(err); }
            //     if (!user) { return res.redirect('/login'); }
            //     req.logIn(user, function (err) {
            //         if (err) { return next(err); }
            //         return res.redirect('/users/' + user.username);
            //     });
            // })(req, res, next);
            res.status(200).json(req.user);
            return next;
        });
    }
    ;
};
UserController = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.IUserService)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map