import mongoose from "mongoose"

export const devicesSchema = new mongoose.Schema({
  browser: String,
  device: String,
  os: String,
  userAgent: String,
})

export const DeviceModel = mongoose.model("devices", devicesSchema)
