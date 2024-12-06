import { NextFunction, Request, Response } from "express"

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = !error.status ? 500 : error.status
  const message = status === 500 ? "Internal sever error" : error.message
  res.status(status).json({
    message,
    payload: error.payload,
    status,
    success: false,
  })
}
