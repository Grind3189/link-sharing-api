import Link from "../models/link.model.js"
import User from "../models/user.model.js"
import { createError } from "../utils.js"

export const getLinks = async (req, res, next) => {
  const userId = req.userId
  const linksData = await Link.find({ creator: userId })
  res.status(200).json(linksData)
}

export const updateLinks = async (req, res, next) => {
  const userId = req.userId
  const links = req.body
  const errors = []

  try {
    const newLinks = links.map((link) => {
      if (!link.platform || !link.link) {
        return errors.push("Link or platform is missing")
      } else {
        const modifiedLink = { ...link, creator: userId }

        // Remove the "_id" field if it exists
        if (modifiedLink._id) {
          delete modifiedLink._id
        }

        return modifiedLink
      }
    })

    if (errors.length) {
      return next(createError(400, "Link or platform is missing"))
    }
    await Link.deleteMany({ creator: userId })

    const updatedLinks = await Link.insertMany(newLinks)
    const user = await User.findById(userId)
    user.links = updatedLinks.map(link => link._id)
    await user.save()

    res.status(201).json(updatedLinks)
  } catch (err) {
    next(err)
  }
}

export const sharedPreview = async (req, res, next) => {
  const userId = req.params.userId
  const user = await User.findById(userId).populate("links profile")

  if (!user) {
    return next(createError(404, "User not found"))
  }

  const {password, email, ...userInfo} = user._doc
  res.status(200).json(userInfo)
}
