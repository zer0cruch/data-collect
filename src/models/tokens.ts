import mongoose from "mongoose"

export const tokenSchema = new mongoose.Schema({
  owner: { ref: "users", type: mongoose.Types.ObjectId },
  token: String,
})

export const TokenModel = mongoose.model("tokens", tokenSchema)
