import bcrypt from "bcrypt"
import dotenv from "dotenv"
import mongoose from "mongoose"

import { LocationModel } from "../models/locations"
dotenv.config()

async function seedLocation() {
  const connectionString = process.env.MONGODB_URL
  if (connectionString) {
    const connection = await mongoose.connect(connectionString)

    await LocationModel.insertMany([
      {
        _id: new mongoose.Types.ObjectId("6491c3e7e4b0d5a2c5a0d3c1"),
        city: "New York",
        country: "USA",
        ip: "192.168.1.1",
        region: "New York",
      },
      {
        _id: new mongoose.Types.ObjectId("6491c3e7e4b0d5a2c5a0d3c2"),
        city: "Paris",
        country: "France",
        ip: "185.12.30.2",
        region: "Île-de-France",
      },
      {
        _id: new mongoose.Types.ObjectId("6491c3e7e4b0d5a2c5a0d3c3"),
        city: "Tokyo",
        country: "Japan",
        ip: "203.0.113.3",
        region: "Kanto",
      },
      {
        _id: new mongoose.Types.ObjectId("6491c3e7e4b0d5a2c5a0d3c4"),
        city: "Berlin",
        country: "Germany",
        ip: "134.56.78.4",
        region: "Berlin",
      },
      {
        _id: new mongoose.Types.ObjectId("6491c3e7e4b0d5a2c5a0d3c5"),
        city: "Cape Town",
        country: "South Africa",
        ip: "197.245.89.5",
        region: "Western Cape",
      },
    ])

    await connection.disconnect()
  }
}

seedLocation()
