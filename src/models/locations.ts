import mongoose from "mongoose"

export const locationsSchema = new mongoose.Schema({
  city: String,
  country: String,
  ip: String,
  region: String,
})

export const LocationModel = mongoose.model("locations", locationsSchema)
