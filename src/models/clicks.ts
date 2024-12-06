import mongoose from "mongoose"

export const clicksSchema = new mongoose.Schema({
  clickedAt: Date,
  contentId: { ref: "content", type: mongoose.Types.ObjectId },
  deviceId: { ref: "devices", type: mongoose.Types.ObjectId },
})

export const ClickModel = mongoose.model("clicks", clicksSchema)
