import express from "express"
import { z } from "zod"

import { authMiddleware } from "../middleware/auth"
import { validate } from "../middleware/validate"
import { ContentModel } from "../models/content"

const contentRouter = express.Router()

const createContentValidator = z.object({
  body: z.object({
    mdFile: z.string().url(),
    preview: z.string().url(),
    tags: z.array(z.string()),
    title: z.string(),
  }),
})

contentRouter.post("/content", [
  authMiddleware,
  validate(createContentValidator),
  async (req: express.Request, res: express.Response) => {
    const mdFile = req.body.mdFile as string
    const preview = req.body.preview as string
    const tags = req.body.tags as string
    const title = req.body.title as string

    const args = { mdFile, preview, tags, title }
    const createdContent = await ContentModel.create(args)

    res.status(201).json({
      payload: { contentId: createdContent._id },
      success: true,
    })
  },
])

contentRouter.get("/content", [
  async (req: express.Request, res: express.Response) => {
    const content = await ContentModel.find()

    res.status(200).json({
      payload: { content },
      success: true,
    })
  },
])

const getContentByIdValidator = z.object({
  params: z.object({
    id: z.string(),
  }),
})

contentRouter.get("/content/:id", [
  validate(getContentByIdValidator),
  async (req: express.Request, res: express.Response) => {
    const id = req.params.id as string
    const existingContent = await ContentModel.findById(id)

    if (!existingContent) {
      res.status(404).json({
        message: "Content not found",
        success: false,
      })

      return
    }

    res.status(200).json({
      payload: { content: existingContent },
      success: true,
    })
  },
])

const deleteContentByIdValidator = z.object({
  params: z.object({
    id: z.string(),
  }),
})

contentRouter.delete("/content/:id", [
  authMiddleware,
  validate(deleteContentByIdValidator),
  async (req: express.Request, res: express.Response) => {
    const id = req.params.id as string
    const existingContent = await ContentModel.findById(id)

    if (!existingContent) {
      res.status(404).json({
        message: "Content not found",
        success: false,
      })

      return
    }

    await ContentModel.findByIdAndDelete(id)

    res.status(203).json({
      payload: { contentId: id },
      success: true,
    })
  },
])

const updateContentValidator = z.object({
  body: z
    .object({
      mdFile: z.string().url(),
      preview: z.string().url(),
      tags: z.array(z.string()),
      title: z.string(),
    })
    .partial(),
  params: z.object({
    id: z.string(),
  }),
})

contentRouter.put("/content/:id", [
  authMiddleware,
  validate(updateContentValidator),
  async (req: express.Request, res: express.Response) => {
    const id = req.params.id as string
    const existingContent = await ContentModel.findById(id)

    if (!existingContent) {
      res.status(404).json({
        message: "Content not found",
        success: false,
      })

      return
    }

    await ContentModel.findByIdAndUpdate(id, req.body)

    res.status(200).json({
      payload: { contentId: id },
      success: true,
    })
  },
])

export { contentRouter }
