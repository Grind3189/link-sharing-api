import Profile from "../models/profile.model.js"
import { createError } from "../utils.js"

export const getProfile = async (req, res, next) => {
  const userId = req.userId
  try {
    const profile = await Profile.findOne({ user: userId })
    console.log(profile)

    if (!profile) {
      return next(createError(404, "No profile found"))
    }

    res.status(200).json(profile)
  } catch (err) {
    next(err)
  }
}

export const updateProfile = async (req, res, next) => {
  const userId = req.userId
  const profile = req.body

  try {
    const existingProfile = await Profile.findOne({ user: userId })
    existingProfile.name = profile.name
    existingProfile.lastname = profile.lastname
    existingProfile.email = profile.email
    existingProfile.image = profile.image
    existingProfile.user = userId
    const result = await existingProfile.save()
    res.status(200).json(result)
  } catch (err) {
    next(err)
  }
}
