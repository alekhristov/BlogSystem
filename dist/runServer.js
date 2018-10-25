"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const inversify_config_1 = require("./inversify.config");
const app = inversify_config_1.default.get(types_1.default.App).app;
const PORT = 3000;
app.listen(PORT, () => {
    console.log("43567jiop");
    console.log(`Express server listening on port ${PORT}`);
});
//# sourceMappingURL=runServer.js.map