"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const blogRoutes_1 = require("./routes/blogRoutes");
class App {
    constructor() {
        this.routePrv = new blogRoutes_1.Routes();
        this.mongoUrl = 'mongodb://localhost:27017/blogSystemDb';
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    ;
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    ;
    mongoSetup() {
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
        mongoose.Promise = global.Promise;
        const db = mongoose.connection;
        db.on('error', err => {
            console.error(`Error while connecting to DB: ${err.message}`);
        });
        db.once('open', () => {
            console.log('DB connected successfully!');
        });
    }
    ;
}
;
exports.default = new App().app;
//# sourceMappingURL=app.js.map