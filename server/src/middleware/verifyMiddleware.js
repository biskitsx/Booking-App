import { createError } from "../utils/error.js"
import tokenManager from "../utils/tokenManager.js"
import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => {
    const token = req.cookies.access_token
    try {
        if (!token) {
            return next(createError(401, "You are not authenticated"))
        }
        const decodeToken = tokenManager.verifyToken(token)
        if (decodeToken.id === req.params.id || decodeToken.isAdmin) {
            req.user = decodeToken
            return next()
        }
        return next(createError(403, "You are not authorized"))
    } catch(e) {
        next(e)
    }
}

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.access_token
    try {
        if (!token) {
            return next(createError(401, "You are not authenticated"))
        }
        const decodeToken = jwt.verify(token, process.env.SECRET_TOKEN)
        if (decodeToken.id === req.params.id || decodeToken.isAdmin) {
            req.user = decodeToken
            return next()
        }
        return next(createError(403, "You are not authorized"))
    } catch(e) {
        next(e)
    }
}