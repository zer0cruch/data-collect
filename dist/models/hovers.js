"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoverModel = exports.hoversSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.hoversSchema = new mongoose_1.default.Schema({
    contentId: { ref: "content", type: mongoose_1.default.Types.ObjectId },
    deviceId: { ref: "devices", type: mongoose_1.default.Types.ObjectId },
    duration: Number,
    mouseEnterAt: Date,
    mouseExitedAt: Date,
});
exports.HoverModel = mongoose_1.default.model("hovers", exports.hoversSchema);
