import mongoose from "mongoose"

export const sessionSchema = new mongoose.Schema({
  contentId: { ref: "content", type: mongoose.Types.ObjectId },
  deviceId: { ref: "devices", type: mongoose.Types.ObjectId },
  duration: Number,
  endDate: Date,
  startDate: Date,
})

export const SessionModel = mongoose.model("session", sessionSchema)
