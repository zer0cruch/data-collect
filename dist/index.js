"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("./middleware/error");
const auth_1 = require("./routes/auth");
const content_1 = require("./routes/content");
const file_1 = require("./routes/file");
const interaction_1 = require("./routes/interaction");
const stats_1 = require("./routes/stats");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set("trust proxy", true);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static(node_path_1.default.join(__dirname, "../uploads")));
app.use(auth_1.authRouter);
app.use(content_1.contentRouter);
app.use(interaction_1.interactionRouter);
app.use(file_1.fileRouter);
app.use(stats_1.statsRoute);
app.use(error_1.errorMiddleware);
const mongodbConnection = process.env.MONGODB_URL;
if (mongodbConnection) {
    mongoose_1.default
        .connect(mongodbConnection)
        .then((connection) => {
        const port = process.env.PORT || 3000;
        console.log("MongoDB connection started");
        app.listen(port, () => {
            console.log("Listening on http://localhost:" + port);
        });
    })
        .catch((err) => {
        console.log("An error has occurred while trying to connect to the database");
        process.exit(1);
    });
}
