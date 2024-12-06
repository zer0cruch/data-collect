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
const content_1 = require("../models/content");
dotenv_1.default.config();
function seedContent() {
    return __awaiter(this, void 0, void 0, function* () {
        const connectionString = process.env.MONGODB_URL;
        if (connectionString) {
            const connection = yield mongoose_1.default.connect(connectionString);
            yield content_1.ContentModel.insertMany([
                {
                    _id: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d1"),
                    mdFile: `${process.env.BASE_URL}/uploads/ocean-waves.md`,
                    preview: `${process.env.BASE_URL}/uploads/ocean-waves.webp`,
                    tags: ["ocean", "waves", "marine life", "climate change"],
                    title: "La science derrière les vagues océaniques",
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d2"),
                    mdFile: `${process.env.BASE_URL}/uploads/human-heart.md`,
                    preview: `${process.env.BASE_URL}/uploads/Heart_anterior_exterior_view.png`,
                    tags: ["human body", "heart", "health", "circulatory system"],
                    title: "Comprendre le cœur humain",
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d3"),
                    mdFile: `${process.env.BASE_URL}/uploads/coral-reefs.md`,
                    preview: `${process.env.BASE_URL}/uploads/coral-reefs.jpg`,
                    tags: ["ocean", "coral reefs", "biodiversity", "marine ecosystems"],
                    title: "les forêts tropicales de l’océan",
                },
                {
                    _id: new mongoose_1.default.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d4"),
                    mdFile: `${process.env.BASE_URL}/uploads/human-brain.md`,
                    preview: `${process.env.BASE_URL}/uploads/human-brain.webp`,
                    tags: ["human body", "brain", "neuroscience", "mental health"],
                    title: "Explorer les merveilles du cerveau humain",
                },
            ]);
            yield connection.disconnect();
        }
    });
}
seedContent();
