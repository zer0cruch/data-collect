"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = exports.tokenSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.tokenSchema = new mongoose_1.default.Schema({
    owner: { ref: "users", type: mongoose_1.default.Types.ObjectId },
    token: String,
});
exports.TokenModel = mongoose_1.default.model("tokens", exports.tokenSchema);
