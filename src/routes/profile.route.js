import express from 'express'
import { getProfile, updateProfile } from '../controllers/profile.controller.js'
import isAuth from '../middlewares/isAuth.js'

const router = express.Router()

router.get('/profile', isAuth, getProfile)
router.put('/updateProfile', isAuth, updateProfile)

export default router