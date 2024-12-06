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
const locations_1 = require("../models/locations");
dotenv_1.default.config();
function seedLocation() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionString = process.env.MONGODB_URL;
        if (connectionString) {
            const connection = yield mongoose_1.default.connect(connectionString);
            yield locations_1.LocationModel.insertMany([
                {
                    _id: new mongoose_1.default.Types.ObjectId("6491c3e7e4b0d5a2c5a0d3c1"),
                    city: "New York",
                    country: "USA",
                    ip: "192.168.1.1",
                    region: "New York",
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("6491c3e7e4b0d5a2c5a0d3c2"),
                    city: "Paris",
                    country: "France",
                    ip: "185.12.30.2",
                    region: "Île-de-France",
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("6491c3e7e4b0d5a2c5a0d3c3"),
                    city: "Tokyo",
                    country: "Japan",
                    ip: "203.0.113.3",
                    region: "Kanto",
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("6491c3e7e4b0d5a2c5a0d3c4"),
                    city: "Berlin",
                    country: "Germany",
                    ip: "134.56.78.4",
                    region: "Berlin",
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("6491c3e7e4b0d5a2c5a0d3c5"),
                    city: "Cape Town",
                    country: "South Africa",
                    ip: "197.245.89.5",
                    region: "Western Cape",
                },
            ]);
            yield connection.disconnect();
        }
    });
}
seedLocation();
