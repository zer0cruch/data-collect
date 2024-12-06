import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  fullName: String,
  password: String,
})

export const UserModel = mongoose.model("users", userSchema)
