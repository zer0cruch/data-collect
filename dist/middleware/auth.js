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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokens_1 = require("../models/tokens");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return next({
            message: "Authorization header is required",
            status: 400,
            success: false,
        });
    const [_, token] = authHeader.split(" ");
    if (!token)
        return next({
            message: "Token is required",
            status: 400,
            success: false,
        });
    try {
        const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const existingBlacklistedToken = yield tokens_1.TokenModel.findOne({ token });
        if (existingBlacklistedToken)
            return next({
                message: "Token is blacklisted",
                status: 400,
                success: false,
            });
        Object.assign(req.body, {
            loggedUser: {
                token,
                userId: payload.userId,
            },
        });
        return next();
    }
    catch (error) {
        return next({
            message: "invalid / expired token",
            status: 400,
            success: false,
        });
    }
});
exports.authMiddleware = authMiddleware;
