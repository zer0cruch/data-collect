"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModel = exports.locationsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.locationsSchema = new mongoose_1.default.Schema({
    city: String,
    country: String,
    ip: String,
    region: String,
});
exports.LocationModel = mongoose_1.default.model("locations", exports.locationsSchema);
