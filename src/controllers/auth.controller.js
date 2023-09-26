import User from "../models/user.model.js"
import Profile from "../models/profile.model.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils.js"
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {
  const { email, password, repeatPassword } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return next(createError(401, "Email is already registered"))
    }

    if (password !== repeatPassword) {
      return next(createError(400, "Invalid password"))
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({
      email,
      password: hashedPassword
    })

    const user = await newUser.save()
    const profile = new Profile({
      name: "",
      lastname: "",
      email,
      image: {
        id: "",
        url: "",
        signature: ""
      },
      user: user._id
    })
    const newProfile = await profile.save()
    const newlyCreatedUser = await User.findById(user._id)
    newlyCreatedUser.profile = newProfile._id
    await newlyCreatedUser.save()

    const jwtKey = process.env.JWT_KEY
    const payload = { userId: user._id }
    const token = jwt.sign(payload, jwtKey, { expiresIn: "12h" })
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        origin: "https://yourdevlinks.netlify.app"
      })
      .status(201)
      .send({ userId: user._id })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return next(createError(404, "User not found"))
    }

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return next(createError(401, "Invalid password"))
    }
    const jwtKey = process.env.JWT_KEY
    const payload = { userId: user._id }
    const token = jwt.sign(payload, jwtKey, { expiresIn: "12h" })
    console.log(token)
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        origin: "https://yourdevlinks.netlify.app"
      })
      .status(200)
      .json({ userId: user._id })
  } catch (err) {
    next(err)
  }
}

export const logout = async (req, res, next) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true
    })
    .status(200)
    .send("User has been logged out.")
}
