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
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = require("../models/users");
dotenv_1.default.config();
function seedUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionString = process.env.MONGODB_URL;
        if (connectionString) {
            const connection = yield mongoose_1.default.connect(connectionString);
            yield users_1.UserModel.insertMany([
                {
                    email: "administrator@gmail.com",
                    fullName: "Administrator",
                    password: yield bcrypt_1.default.hash("admin", 10),
                },
            ]);
            yield connection.disconnect();
        }
    });
}
seedUsers();
