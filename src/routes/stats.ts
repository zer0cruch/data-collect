import express from "express"

import { authMiddleware } from "../middleware/auth"
import { DataPlotModel } from "../models/dataplots"

const statsRoute = express.Router()

statsRoute.get("/stats", [
  authMiddleware,
  async (req: express.Request, res: express.Response) => {
    const stats = await DataPlotModel.find()
    res.status(200).json({
      payload: { stats },
      success: true,
    })
  },
])

export { statsRoute }
