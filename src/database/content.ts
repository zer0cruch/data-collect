import dotenv from "dotenv"
import mongoose from "mongoose"

import { ContentModel } from "../models/content"
dotenv.config()

async function seedContent() {
  const connectionString = process.env.MONGODB_URL
  if (connectionString) {
    const connection = await mongoose.connect(connectionString)

    await ContentModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d1"),
        mdFile: `${process.env.BASE_URL}/uploads/ocean-waves.md`,
        preview: `${process.env.BASE_URL}/uploads/ocean-waves.webp`,
        tags: ["ocean", "waves", "marine life", "climate change"],
        title: "La science derrière les vagues océaniques",
      },
      {
        _id: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d2"),
        mdFile: `${process.env.BASE_URL}/uploads/human-heart.md`,
        preview: `${process.env.BASE_URL}/uploads/Heart_anterior_exterior_view.png`,
        tags: ["human body", "heart", "health", "circulatory system"],
        title: "Comprendre le cœur humain",
      },
      {
        _id: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d3"),
        mdFile: `${process.env.BASE_URL}/uploads/coral-reefs.md`,
        preview: `${process.env.BASE_URL}/uploads/coral-reefs.jpg`,
        tags: ["ocean", "coral reefs", "biodiversity", "marine ecosystems"],
        title: "les forêts tropicales de l’océan",
      },
      {
        _id: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d4"),
        mdFile: `${process.env.BASE_URL}/uploads/human-brain.md`,
        preview: `${process.env.BASE_URL}/uploads/human-brain.webp`,
        tags: ["human body", "brain", "neuroscience", "mental health"],
        title: "Explorer les merveilles du cerveau humain",
      },
    ])

    await connection.disconnect()
  }
}

seedContent()
