require("dotenv").config();
import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";

import { inject, injectable } from "inversify";

import { Routes } from "./routes/blogRoutes";
import TYPES from "./types";

@injectable()
export default class App {

    private _app: express.Application;
    private _routePrv: Routes; 
    private _mongoUrl: string = `mongodb://${process.env.MONGO_URL}:27017/blogSystemDb`;

    constructor(
        @inject(TYPES.Routes) routes: Routes,
    ) {
        this._routePrv = routes;
        this._app = express();
        this.config();
        this._routePrv.routes(this._app);
        this.mongoSetup();
    };

    public get app(): express.Application {
        return this._app;
    }

    private config(): void {
        // support application/json type post data
        this._app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this._app.use(bodyParser.urlencoded({ extended: false }));
    };

    private mongoSetup(): void {
        mongoose.set("useCreateIndex", true);
        mongoose.connect(this._mongoUrl, { useNewUrlParser: true });
        (<any>mongoose).Promise = global.Promise;
        const db = mongoose.connection;


        db.on("error", err => {
            console.error(`Error while connecting to DB: ${err.message}`);
            console.log(`Failed to connect to database on: ${this._mongoUrl}`);
        });
        db.once("open", () => {
            console.log("DB connected successfully!");
            console.log(`Connect to database on: ${this._mongoUrl}`);
        });
    };
};

// export default new App().app;