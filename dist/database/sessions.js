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
const session_1 = require("../models/session");
dotenv_1.default.config();
function seedSession() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionString = process.env.MONGODB_URL;
        if (connectionString) {
            const connection = yield mongoose_1.default.connect(connectionString);
            yield session_1.SessionModel.create([
                {
                    _id: new mongoose_1.default.Types.ObjectId("648f5a7de4b0d5a2c5a0d1a1"),
                    contentId: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d1"),
                    deviceId: new mongoose_1.default.Types.ObjectId("67525e14a748a566cce4722b"),
                    duration: 15000,
                    endDate: new Date("2024-12-05T10:10:00Z"),
                    startDate: new Date("2024-12-05T10:10:15Z"),
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648f5a7de4b0d5a2c5a0d1a2"),
                    contentId: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d2"),
                    deviceId: new mongoose_1.default.Types.ObjectId("67525e232a87ea714a7d247c"),
                    duration: 30000,
                    endDate: new Date("2024-12-05T11:00:30Z"),
                    startDate: new Date("2024-12-05T11:01:00Z"),
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648f5a7de4b0d5a2c5a0d1a3"),
                    contentId: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d3"),
                    deviceId: new mongoose_1.default.Types.ObjectId("67525e2e98c92f85203219bc"),
                    duration: 15000,
                    endDate: new Date("2024-12-05T12:15:45Z"),
                    startDate: new Date("2024-12-05T12:16:00Z"),
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648f5a7de4b0d5a2c5a0d1a4"),
                    contentId: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d4"),
                    deviceId: new mongoose_1.default.Types.ObjectId("67525e3b9f9b857d12f91a5d"),
                    duration: 15000,
                    endDate: new Date("2024-12-05T13:20:10Z"),
                    startDate: new Date("2024-12-05T13:20:25Z"),
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648f5a7de4b0d5a2c5a0d1a5"),
                    contentId: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d1"),
                    deviceId: new mongoose_1.default.Types.ObjectId("67525e461fb0b17f5c199b75"),
                    duration: 10000,
                    endDate: new Date("2024-12-05T14:05:00Z"),
                    startDate: new Date("2024-12-05T14:05:10Z"),
                },
            ]);
            yield connection.disconnect();
        }
    });
}
seedSession();
