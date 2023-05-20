import mongoose from 'mongoose'
import { logger } from './logger.js'

export const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI
        await mongoose.connect(MONGO_URI)
        logger.info("connected database")
        
    } catch(e) {
        logger.error("can't connected database")
    }
}