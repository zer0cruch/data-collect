"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickModel = exports.clicksSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.clicksSchema = new mongoose_1.default.Schema({
    clickedAt: Date,
    contentId: { ref: "content", type: mongoose_1.default.Types.ObjectId },
    deviceId: { ref: "devices", type: mongoose_1.default.Types.ObjectId },
});
exports.ClickModel = mongoose_1.default.model("clicks", exports.clicksSchema);
