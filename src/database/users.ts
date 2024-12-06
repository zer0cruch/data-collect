import bcrypt from "bcrypt"
import dotenv from "dotenv"
import mongoose from "mongoose"

import { UserModel } from "../models/users"
dotenv.config()

async function seedUsers() {
  const connectionString = process.env.MONGODB_URL
  if (connectionString) {
    const connection = await mongoose.connect(connectionString)

    await UserModel.insertMany([
      {
        email: "administrator@gmail.com",
        fullName: "Administrator",
        password: await bcrypt.hash("admin", 10),
      },
    ])

    await connection.disconnect()
  }
}

seedUsers()
