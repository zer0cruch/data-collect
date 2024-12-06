import path from "node:path"

import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

import { errorMiddleware } from "./middleware/error"
import { authRouter } from "./routes/auth"
import { contentRouter } from "./routes/content"
import { fileRouter } from "./routes/file"
import { interactionRouter } from "./routes/interaction"
import { statsRoute } from "./routes/stats"

dotenv.config()
const app = express()

app.set("trust proxy", true)
app.use(cors({ origin: "*" }))
app.use(express.json())

app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.use(authRouter)
app.use(contentRouter)
app.use(interactionRouter)
app.use(fileRouter)
app.use(statsRoute)
app.use(errorMiddleware)

const mongodbConnection = process.env.MONGODB_URL
if (mongodbConnection) {
  mongoose
    .connect(mongodbConnection)
    .then((connection) => {
      const port = process.env.PORT || 3000
      console.log("MongoDB connection started")
      app.listen(port, () => {
        console.log("Listening on http://localhost:" + port)
      })
    })
    .catch((err) => {
      console.log(
        "An error has occurred while trying to connect to the database",
      )
      process.exit(1)
    })
}
