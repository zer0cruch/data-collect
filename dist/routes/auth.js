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
exports.authRouter = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const tokens_1 = require("../models/tokens");
const users_1 = require("../models/users");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const authValidator = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
authRouter.post("/auth", [
    (0, validate_1.validate)(authValidator),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.password;
        const existingUser = yield users_1.UserModel.findOne({ email });
        if (!existingUser ||
            !existingUser.password ||
            !(yield bcrypt_1.default.compare(password, existingUser.password))) {
            res.status(400).json({
                message: "Invalid credentials",
                success: false,
            });
            return;
        }
        const accessToken = jsonwebtoken_1.default.sign({ userId: existingUser._id }, process.env.JWT_SECRET);
        res.status(200).json({
            payload: { token: accessToken },
            success: true,
        });
    }),
]);
authRouter.post("/logout", [
    auth_1.authMiddleware,
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.body.loggedUser.token;
        const userId = req.body.loggedUser.userId;
        yield tokens_1.TokenModel.create({
            owner: userId,
            token,
        });
        res.status(200).json({
            message: "Logged out successfully",
            success: true,
        });
    }),
]);
