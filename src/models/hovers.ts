import mongoose from "mongoose"

export const hoversSchema = new mongoose.Schema({
  contentId: { ref: "content", type: mongoose.Types.ObjectId },
  deviceId: { ref: "devices", type: mongoose.Types.ObjectId },
  duration: Number,
  mouseEnterAt: Date,
  mouseExitedAt: Date,
})

export const HoverModel = mongoose.model("hovers", hoversSchema)
