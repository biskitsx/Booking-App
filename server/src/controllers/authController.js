import { errorHotelMiddleware } from "../middleware/hotelMiddleware.js"
import User from "../models/User.js"
import { createError } from "../utils/error.js"
import tokenManager from '../utils/tokenManager.js'
export const register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body
        const user = await User.register(username, email, password)
        res.json(user)
    } catch(e) {
        next(e)
    }
}

export const login = async (req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await User.login(username, password)
        // console.log(user)
        const token     = tokenManager.createToken(user._id, user.isAdmin)
        // const decodeToken = tokenManager.verifyToken(token)
        // console.log(decodeToken)
        res
            .cookie("access_token", token, { httpOnly: true })
            .json(user)
    } catch(e) {
        next(createError(404,e.message))
    }
}