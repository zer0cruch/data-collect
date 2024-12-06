import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

import { TokenModel } from "../models/tokens"

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization
  if (!authHeader)
    return next({
      message: "Authorization header is required",
      status: 400,
      success: false,
    })

  const [_, token] = authHeader.split(" ")
  if (!token)
    return next({
      message: "Token is required",
      status: 400,
      success: false,
    })

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string)

    const existingBlacklistedToken = await TokenModel.findOne({ token })
    if (existingBlacklistedToken)
      return next({
        message: "Token is blacklisted",
        status: 400,
        success: false,
      })

    Object.assign(req.body, {
      loggedUser: {
        token,
        userId: (payload as any).userId,
      },
    })

    return next()
  } catch (error) {
    return next({
      message: "invalid / expired token",
      status: 400,
      success: false,
    })
  }
}
