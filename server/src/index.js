// package import
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

// dotenv config
dotenv.config()
const PORT = process.env.PORT

// utils
import { connectDB } from './utils/connectDB.js'
import { logger } from './utils/logger.js'

// routes import
import authRoutes from './routes/authRoutes.js'
import hotelRoutes from './routes/hotelRoutes.js'
import roomRoutes from './routes/roomRoutes.js'
import userRoutes from './routes/userRoutes.js'

// middleware import
import { errorMiddleware } from './middleware/errorMiddleware.js'

// file import


// express app
const app = express()

// middleware
app.use(express.json())
app.use(cookieParser())
// route
app.use("/api/auth", authRoutes )
app.use("/api/user", userRoutes )
app.use("/api/hotel", hotelRoutes )
app.use("/api/room", roomRoutes)

// middleware error
app.use(errorMiddleware)

// listen & connectDB
app.listen(PORT, ()=> {
    logger.info(`Server Running at PORT ${PORT}`)
    connectDB()
})