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
exports.contentRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const content_1 = require("../models/content");
const contentRouter = express_1.default.Router();
exports.contentRouter = contentRouter;
const createContentValidator = zod_1.z.object({
    body: zod_1.z.object({
        mdFile: zod_1.z.string().url(),
        preview: zod_1.z.string().url(),
        tags: zod_1.z.array(zod_1.z.string()),
        title: zod_1.z.string(),
    }),
});
contentRouter.post("/content", [
    auth_1.authMiddleware,
    (0, validate_1.validate)(createContentValidator),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const mdFile = req.body.mdFile;
        const preview = req.body.preview;
        const tags = req.body.tags;
        const title = req.body.title;
        const args = { mdFile, preview, tags, title };
        const createdContent = yield content_1.ContentModel.create(args);
        res.status(201).json({
            payload: { contentId: createdContent._id },
            success: true,
        });
    }),
]);
contentRouter.get("/content", [
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const content = yield content_1.ContentModel.find();
        res.status(200).json({
            payload: { content },
            success: true,
        });
    }),
]);
const getContentByIdValidator = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
});
contentRouter.get("/content/:id", [
    (0, validate_1.validate)(getContentByIdValidator),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const existingContent = yield content_1.ContentModel.findById(id);
        if (!existingContent) {
            res.status(404).json({
                message: "Content not found",
                success: false,
            });
            return;
        }
        res.status(200).json({
            payload: { content: existingContent },
            success: true,
        });
    }),
]);
const deleteContentByIdValidator = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
});
contentRouter.delete("/content/:id", [
    auth_1.authMiddleware,
    (0, validate_1.validate)(deleteContentByIdValidator),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const existingContent = yield content_1.ContentModel.findById(id);
        if (!existingContent) {
            res.status(404).json({
                message: "Content not found",
                success: false,
            });
            return;
        }
        yield content_1.ContentModel.findByIdAndDelete(id);
        res.status(203).json({
            payload: { contentId: id },
            success: true,
        });
    }),
]);
const updateContentValidator = zod_1.z.object({
    body: zod_1.z
        .object({
        mdFile: zod_1.z.string().url(),
        preview: zod_1.z.string().url(),
        tags: zod_1.z.array(zod_1.z.string()),
        title: zod_1.z.string(),
    })
        .partial(),
    params: zod_1.z.object({
        id: zod_1.z.string(),
    }),
});
contentRouter.put("/content/:id", [
    auth_1.authMiddleware,
    (0, validate_1.validate)(updateContentValidator),
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.params.id;
        const existingContent = yield content_1.ContentModel.findById(id);
        if (!existingContent) {
            res.status(404).json({
                message: "Content not found",
                success: false,
            });
            return;
        }
        yield content_1.ContentModel.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            payload: { contentId: id },
            success: true,
        });
    }),
]);
