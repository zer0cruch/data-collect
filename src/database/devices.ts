import bcrypt from "bcrypt"
import dotenv from "dotenv"
import mongoose from "mongoose"

import { DeviceModel } from "../models/devices"
dotenv.config()

async function seedDevices() {
  const connectionString = process.env.MONGODB_URL
  if (connectionString) {
    const connection = await mongoose.connect(connectionString)

    await DeviceModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b1"),
        browser: "Google Chrome",
        device: "Desktop",
        os: "Windows 10",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      },
      {
        _id: new mongoose.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b2"),
        browser: "Mozilla Firefox",
        device: "Desktop",
        os: "Ubuntu 20.04",
        userAgent:
          "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0",
      },
      {
        _id: new mongoose.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b3"),
        browser: "Safari",
        device: "Mobile",
        os: "iOS 16",
        userAgent:
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
      },
      {
        _id: new mongoose.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b4"),
        browser: "Microsoft Edge",
        device: "Laptop",
        os: "Windows 11",
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67",
      },
      {
        _id: new mongoose.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b5"),
        browser: "Opera",
        device: "Tablet",
        os: "Android 12",
        userAgent:
          "Mozilla/5.0 (Linux; Android 12; SM-T970) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.71 Safari/537.36 OPR/80.0.4170.72",
      },
      {
        _id: new mongoose.Types.ObjectId("67526552bd7ec17b4e0539af"),
        browser: "Google Chrome",
        device: "Smart TV",
        os: "Tizen OS",
        userAgent:
          "Mozilla/5.0 (SMART-TV; Linux; Tizen 6.0) AppleWebKit/537.36 (KHTML, like Gecko) Version/6.0 Chrome/78.0.3904.106 Safari/537.36",
      },
    ])

    await connection.disconnect()
  }
}

seedDevices()
