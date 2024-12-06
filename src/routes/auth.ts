import bcrypt from "bcrypt"
import express from "express"
import jwt from "jsonwebtoken"
import { z } from "zod"

import { authMiddleware } from "../middleware/auth"
import { validate } from "../middleware/validate"
import { TokenModel } from "../models/tokens"
import { UserModel } from "../models/users"

const authRouter = express.Router()

const authValidator = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
})

authRouter.post("/auth", [
  validate(authValidator),
  async (req: express.Request, res: express.Response) => {
    const email = req.body.email as string
    const password = req.body.password as string

    const existingUser = await UserModel.findOne({ email })
    if (
      !existingUser ||
      !existingUser.password ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      res.status(400).json({
        message: "Invalid credentials",
        success: false,
      })

      return
    }

    const accessToken = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET as string,
    )

    res.status(200).json({
      payload: { token: accessToken },
      success: true,
    })
  },
])

authRouter.post("/logout", [
  authMiddleware,
  async (req: express.Request, res: express.Response) => {
    const token = req.body.loggedUser.token as string
    const userId = req.body.loggedUser.userId as string

    await TokenModel.create({
      owner: userId,
      token,
    })

    res.status(200).json({
      message: "Logged out successfully",
      success: true,
    })
  },
])

export { authRouter }
