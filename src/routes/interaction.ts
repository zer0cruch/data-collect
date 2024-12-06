import express from "express"
import mongoose from "mongoose"
import { IPinfoWrapper } from "node-ipinfo"
import requestIp from "request-ip"
import useragent from "useragent"
import { z } from "zod"

import { validate } from "../middleware/validate"
import { ClickModel } from "../models/clicks"
import { DeviceModel } from "../models/devices"
import { HoverModel } from "../models/hovers"
import { LocationModel } from "../models/locations"
import { SessionModel } from "../models/session"

const interactionRouter = express.Router()

const clickValidator = z.object({
  clickedAt: z.string().datetime(),
  contentId: z.string().optional(),
  type: z.literal("click"),
})

const hoverValidator = z.object({
  contentId: z.string(),
  mouseEnteredAt: z.string().datetime(),
  mouseExitedAt: z.string().datetime(),
  type: z.literal("hover"),
})

const sessionValidator = z.object({
  contentId: z.string().optional(),
  endDate: z.string().datetime(),
  startDate: z.string().datetime(),
  type: z.literal("session"),
})

const collectInteractionValidator = z.object({
  body: z.discriminatedUnion("type", [
    clickValidator,
    hoverValidator,
    sessionValidator,
  ]),
})

interactionRouter.post("/interactions", [
  validate(collectInteractionValidator),
  async (req: express.Request, res: express.Response) => {
    const rawUserAgent = req.headers["user-agent"]
    const agent = useragent.parse(rawUserAgent)

    const existingUserAgent = await DeviceModel.findOne({
      userAgent: rawUserAgent,
    })

    let deviceId: mongoose.Types.ObjectId | undefined = undefined

    if (!existingUserAgent) {
      const createdUserAgent = await DeviceModel.create({
        browser: agent.toAgent(),
        device: agent.device.toString(),
        os: agent.os.toString(),
        userAgent: rawUserAgent,
      })

      deviceId = createdUserAgent._id
    }

    deviceId = deviceId as mongoose.Types.ObjectId

    const ip = requestIp.getClientIp(req)

    if (ip) {
      const existingLocation = await LocationModel.findOne({ ip })
      if (!existingLocation) {
        const ipInfoAccessKey = process.env.IP_INFO_ACCESS_KEY as string
        const ipInfoWrapper = new IPinfoWrapper(ipInfoAccessKey)
        const details = await ipInfoWrapper.lookupIp(ip)

        await LocationModel.create({
          city: details.city,
          country: details.country,
          ip: details.ip,
          region: details.region,
        })
      }
    }

    const interactionType = req.body.type as "click" | "hover" | "session"

    if (interactionType === "click") {
      const clickedAt = new Date(req.body.clickedAt)
      const contentId = req.body.contentId as string

      await ClickModel.create({
        clickedAt,
        contentId,
        deviceId,
      })
    }

    if (interactionType === "hover") {
      const contentId = req.body.contentId as string
      const mouseEnteredAt = new Date(req.body.mouseEnteredAt)
      const mouseExitedAt = new Date(req.body.mouseExitedAt)
      const duration = mouseExitedAt.getTime() - mouseEnteredAt.getTime()

      await HoverModel.create({
        contentId,
        deviceId,
        duration,
        mouseEnteredAt,
        mouseExitedAt,
      })
    }

    if (interactionType === "session") {
      const contentId = req.body.contentId as string
      const startDate = new Date(req.body.startDate)
      const endDate = new Date(req.body.endDate)
      const duration = endDate.getTime() - startDate.getTime()

      await SessionModel.create({
        contentId,
        deviceId,
        duration,
        endDate,
        startDate,
      })
    }

    res.status(200).send({ success: true })
  },
])

export { interactionRouter }
