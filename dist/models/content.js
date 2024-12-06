"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = exports.contentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.contentSchema = new mongoose_1.default.Schema({
    mdFile: String,
    preview: String,
    tags: [String],
    title: String,
});
exports.ContentModel = mongoose_1.default.model("content", exports.contentSchema);
