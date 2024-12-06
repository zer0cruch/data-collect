import mongoose from "mongoose"

export const contentSchema = new mongoose.Schema({
  mdFile: String,
  preview: String,
  tags: [String],
  title: String,
})

export const ContentModel = mongoose.model("content", contentSchema)
