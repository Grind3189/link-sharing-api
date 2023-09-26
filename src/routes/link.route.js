import express from 'express'
import { getLinks, sharedPreview, updateLinks } from '../controllers/link.controller.js'
import isAuth from '../middlewares/isAuth.js'
const router = express.Router()

router.get('/links', isAuth, getLinks)
router.put('/updateLinks', isAuth, updateLinks)
router.get('/preview/:userId', sharedPreview)

export default router