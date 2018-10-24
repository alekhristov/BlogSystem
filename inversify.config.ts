import "reflect-metadata";

import App from "./src/app";
import { Container } from "inversify";
import { IPostController } from "./src/controllers/interfaces/IPostController";
import { IPostService } from "./src/services/interfaces/IPostService";
import { IUserController } from "./src/controllers/interfaces/IUserController";
import { IUserService } from "./src/services/interfaces/IUserService";
import { PostController } from "./src/controllers/postController";
import { PostService } from "./src/services/postService";
import { Routes } from "./src/routes/blogRoutes";
import TYPES from "./types";
import { UserController } from "./src/controllers/userController";
import { UserService } from "./src/services/userService";

const container = new Container();
container.bind<App>(TYPES.App).to(App).inSingletonScope();
container.bind<Routes>(TYPES.Routes).to(Routes).inSingletonScope();
container.bind<IPostController>(TYPES.IPostController).to(PostController).inSingletonScope();
container.bind<IUserController>(TYPES.IUserController).to(UserController).inSingletonScope();
container.bind<IPostService>(TYPES.IPostService).to(PostService).inSingletonScope();
container.bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();

export default container;