import { NextFunction, Request, Response } from "express"
import { z } from "zod"

export const validate =
  (schema: z.ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedResult = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    })

    if (parsedResult.success) return next()

    const result: Record<string, string> = {}
    for (const entry of parsedResult.error.errors) {
      const key = entry.path[entry.path.length - 1]
      result[key] = entry.message
    }

    return next({
      message: "An error occurred while validating the request",
      payload: result,
      status: 400,
      success: false,
    })
  }
