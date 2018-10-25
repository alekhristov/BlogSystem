import "reflect-metadata";

import App from "./app";
import { Container } from "inversify";
import { IPostController } from "./controllers/interfaces/IPostController";
import { IPostService } from "./services/interfaces/IPostService";
import { IUserController } from "./controllers/interfaces/IUserController";
import { IUserService } from "./services/interfaces/IUserService";
import { PostController } from "./controllers/postController";
import { PostService } from "./services/postService";
import { Routes } from "./routes/blogRoutes";
import TYPES from "./types";
import { UserController } from "./controllers/userController";
import { UserService } from "./services/userService";

const container = new Container();
container.bind<App>(TYPES.App).to(App).inSingletonScope();
container.bind<Routes>(TYPES.Routes).to(Routes).inSingletonScope();
container.bind<IPostController>(TYPES.IPostController).to(PostController).inSingletonScope();
container.bind<IUserController>(TYPES.IUserController).to(UserController).inSingletonScope();
container.bind<IPostService>(TYPES.IPostService).to(PostService).inSingletonScope();
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();

export default container;