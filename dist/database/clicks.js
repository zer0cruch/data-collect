"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const clicks_1 = require("../models/clicks");
dotenv_1.default.config();
function seedClick() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionString = process.env.MONGODB_URL;
        if (connectionString) {
            const connection = yield mongoose_1.default.connect(connectionString);
            yield clicks_1.ClickModel.insertMany([
                {
                    _id: new mongoose_1.default.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b1"),
                    clickedAt: new Date("2024-12-05T10:15:30Z"),
                    contentId: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d1"),
                    deviceId: new mongoose_1.default.Types.ObjectId("67525e14a748a566cce4722b"),
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b2"),
                    clickedAt: new Date("2024-12-05T11:20:45Z"),
                    contentId: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d2"),
                    deviceId: new mongoose_1.default.Types.ObjectId("67525e232a87ea714a7d247c"),
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b3"),
                    clickedAt: new Date("2024-12-05T12:30:15Z"),
                    deviceId: new mongoose_1.default.Types.ObjectId("67525e2e98c92f85203219bc"),
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b4"),
                    clickedAt: new Date("2024-12-05T13:45:00Z"),
                    contentId: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d3"),
                    deviceId: new mongoose_1.default.Types.ObjectId("67525e3b9f9b857d12f91a5d"),
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b5"),
                    clickedAt: new Date("2024-12-05T14:00:10Z"),
                    contentId: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d4"),
                    deviceId: new mongoose_1.default.Types.ObjectId("67525e461fb0b17f5c199b75"),
                },
            ]);
            yield connection.disconnect();
        }
    });
}
seedClick();
