import jwt from 'jsonwebtoken'
import {createError} from '../utils.js'

const isAuth = (req,res,next) => {
    const token = req.cookies.accessToken

    if(!token) {
        next(createError(403,"Not authenticated"))
    }

    let decodedToken

    try {
        decodedToken = jwt.verify(token, process.env.JWT_KEY)
    } catch(err){
        next(createError(403,"Not authenticated"))
    }

    req.userId = decodedToken.userId
    next()
}

export default isAuth