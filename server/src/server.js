import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import connectToDB from './config/dbConnection.js'
import errorMiddleware from "./middleware/error.middleware.js"
import cloudinary from 'cloudinary'
const app = express()

// mongodb connection
connectToDB();

// Cloudinary Config
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))
app.use(cookieParser())
app.use(morgan("dev"))

// Routes Import
import authRouter from './routes/user.routes.js'
import morgan from 'morgan'

// Routes Decleration
app.use('/api/v1/user', authRouter);


app.use(errorMiddleware);

app.use('/ping', (req, res) => {
    res.send('pong')
})

app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 Page not found')
})

// Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})