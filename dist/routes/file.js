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
exports.fileRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middleware/auth");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
const fileRouter = express_1.default.Router();
exports.fileRouter = fileRouter;
fileRouter.post("/upload", [
    auth_1.authMiddleware,
    upload.single("file"),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        res.status(200).json({
            payload: { url: `${process.env.BASE_URL}/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path}` },
            success: true,
        });
    }),
]);
