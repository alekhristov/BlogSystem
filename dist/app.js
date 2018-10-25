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
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const inversify_1 = require("inversify");
const blogRoutes_1 = require("./routes/blogRoutes");
const types_1 = require("./types");
let App = class App {
    constructor(routes) {
        this._mongoUrl = "mongodb://mongodb:27017/blogSystemDb";
        this._routePrv = routes;
        this._app = express();
        this.config();
        this._routePrv.routes(this._app);
        this.mongoSetup();
    }
    ;
    get app() {
        return this._app;
    }
    config() {
        // support application/json type post data
        this._app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this._app.use(bodyParser.urlencoded({ extended: false }));
    }
    ;
    mongoSetup() {
        mongoose.set("useCreateIndex", true);
        mongoose.connect(this._mongoUrl, { useNewUrlParser: true });
        mongoose.Promise = global.Promise;
        const db = mongoose.connection;
        db.on("error", err => {
            console.error("Error while connecting to DB: ${err.message}");
        });
        db.once("open", () => {
            console.log("DB connected successfully!");
        });
    }
    ;
};
App = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.Routes)),
    __metadata("design:paramtypes", [blogRoutes_1.Routes])
], App);
exports.default = App;
;
// export default new App().app;
//# sourceMappingURL=app.js.map