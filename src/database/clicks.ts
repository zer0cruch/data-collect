import dotenv from "dotenv"
import mongoose from "mongoose"

import { ClickModel } from "../models/clicks"
dotenv.config()

async function seedClick() {
  const connectionString = process.env.MONGODB_URL
  if (connectionString) {
    const connection = await mongoose.connect(connectionString)

    await ClickModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b1"),
        clickedAt: new Date("2024-12-05T10:15:30Z"),
        contentId: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d1"),
        deviceId: new mongoose.Types.ObjectId("67525e14a748a566cce4722b"),
      },
      {
        _id: new mongoose.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b2"),
        clickedAt: new Date("2024-12-05T11:20:45Z"),
        contentId: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d2"),
        deviceId: new mongoose.Types.ObjectId("67525e232a87ea714a7d247c"),
      },
      {
        _id: new mongoose.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b3"),
        clickedAt: new Date("2024-12-05T12:30:15Z"),
        deviceId: new mongoose.Types.ObjectId("67525e2e98c92f85203219bc"),
      },
      {
        _id: new mongoose.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b4"),
        clickedAt: new Date("2024-12-05T13:45:00Z"),
        contentId: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d3"),
        deviceId: new mongoose.Types.ObjectId("67525e3b9f9b857d12f91a5d"),
      },
      {
        _id: new mongoose.Types.ObjectId("648e3f1de4b0d5a2c5a0a1b5"),
        clickedAt: new Date("2024-12-05T14:00:10Z"),
        contentId: new mongoose.Types.ObjectId("648e4f3ce4b0d5a2c5a0c2d4"),
        deviceId: new mongoose.Types.ObjectId("67525e461fb0b17f5c199b75"),
      },
    ])

    await connection.disconnect()
  }
}

seedClick()
