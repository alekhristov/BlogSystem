import App from "./app";
import TYPES from "./types";
import container from "./inversify.config";

const app = container.get<App>(TYPES.App).app;
const PORT = 3000;

app.listen(PORT, () => {
    console.log("43567jiop");
    console.log(`Express server listening on port ${PORT}`);
});
