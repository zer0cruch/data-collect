import bcrypt from "bcrypt"
import dotenv from "dotenv"
import mongoose from "mongoose"

import { SessionModel } from "../models/session"

dotenv.config()

async function seedSession() {
  const connectionString = process.env.MONGODB_URL
  if (connectionString) {
    const connection = await mongoose.connect(connectionString)

    await SessionModel.create([
      {
        _id: new mongoose.Types.ObjectId("648f5a7de4b0d5a2c5a0d1a1"),
        contentId: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d1"),
        deviceId: new mongoose.Types.ObjectId("67525e14a748a566cce4722b"),
        duration: 15000,
        endDate: new Date("2024-12-05T10:10:00Z"),
        startDate: new Date("2024-12-05T10:10:15Z"),
      },
      {
        _id: new mongoose.Types.ObjectId("648f5a7de4b0d5a2c5a0d1a2"),
        contentId: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d2"),
        deviceId: new mongoose.Types.ObjectId("67525e232a87ea714a7d247c"),
        duration: 30000,
        endDate: new Date("2024-12-05T11:00:30Z"),
        startDate: new Date("2024-12-05T11:01:00Z"),
      },
      {
        _id: new mongoose.Types.ObjectId("648f5a7de4b0d5a2c5a0d1a3"),
        contentId: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d3"),
        deviceId: new mongoose.Types.ObjectId("67525e2e98c92f85203219bc"),
        duration: 15000,
        endDate: new Date("2024-12-05T12:15:45Z"),
        startDate: new Date("2024-12-05T12:16:00Z"),
      },
      {
        _id: new mongoose.Types.ObjectId("648f5a7de4b0d5a2c5a0d1a4"),
        contentId: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d4"),
        deviceId: new mongoose.Types.ObjectId("67525e3b9f9b857d12f91a5d"),
        duration: 15000,
        endDate: new Date("2024-12-05T13:20:10Z"),
        startDate: new Date("2024-12-05T13:20:25Z"),
      },
      {
        _id: new mongoose.Types.ObjectId("648f5a7de4b0d5a2c5a0d1a5"),
        contentId: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d1"),
        deviceId: new mongoose.Types.ObjectId("67525e461fb0b17f5c199b75"),
        duration: 10000,
        endDate: new Date("2024-12-05T14:05:00Z"),
        startDate: new Date("2024-12-05T14:05:10Z"),
      },
    ])

    await connection.disconnect()
  }
}

seedSession()
