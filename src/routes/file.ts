import express from "express"
import multer from "multer"

import { authMiddleware } from "../middleware/auth"

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads")
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  },
})

const upload = multer({ storage })

const fileRouter = express.Router()

fileRouter.post("/upload", [
  authMiddleware,
  upload.single("file"),
  async (req: express.Request, res: express.Response) => {
    res.status(200).json({
      payload: { url: `${process.env.BASE_URL}/${req.file?.path}` },
      success: true,
    })
  },
])

export { fileRouter }
