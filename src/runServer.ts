import App from "./app";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";

const userService = new UserService();
const userController = new UserController();

// services => controlelrite
// controllers => router

const app = (new App()).app;
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
