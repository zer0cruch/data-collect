"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPlotModel = exports.dataPlotSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.dataPlotSchema = new mongoose_1.default.Schema({
    data: mongoose_1.default.Schema.Types.Mixed,
    title: String,
});
exports.DataPlotModel = mongoose_1.default.model("dataplots", exports.dataPlotSchema);
