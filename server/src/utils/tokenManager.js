import jwt from 'jsonwebtoken'
import { createError } from './error.js'

class tokenManager {
    static createToken = (id, isAdmin) => {
        return jwt.sign({ id, isAdmin }, process.env.SECRET_TOKEN)
    }
    static verifyToken = (token) => {
        try {
            return jwt.verify(token, process.env.SECRET_TOKEN)
        } catch(e) {
            throw createError(404,e.message)
        }
    }
}

export default tokenManager