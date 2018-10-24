import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/blogRoutes";

export default class App {

    private _app: express.Application;
    private _routePrv: Routes = new Routes();
    private _mongoUrl: string = "mongodb://localhost:27017/blogSystemDb";

    constructor() {
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
        mongoose.connect(this._mongoUrl, { useNewUrlParser: true });
        (<any>mongoose).Promise = global.Promise;
        const db = mongoose.connection;


        db.on("error", err => {
            console.error("Error while connecting to DB: ${err.message}");
        });
        db.once("open", () => {
            console.log("DB connected successfully!");
        });
    };
};

// export default new App().app;