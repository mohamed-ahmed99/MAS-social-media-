import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

// routes
import authRoutes from './routes/auth.routes.js'
import postRoute from './routes/post.routes.js'
import usersRouter from './routes/users.routes.js'
import relationshipsRouter from './routes/relationships.routes.js'

const app = express() 
dotenv.config()

// cors
const allowedOrigins = process.env.ORIGINS.split(',') || []
app.use(cors({
    origin: (origin, callBack) => {
        if(!origin || allowedOrigins.includes(origin)) return callBack(null, true)
        else return callBack(new Error("NOT allowed by CORS"))
    },
    methods:["POST", "GET", "PUT", "PATCH","DELETE"],
    credentials:true
}))


app.use(express.json())
app.use(cookieParser())


// connect with DB
const ConnectDB = async () => {
    try{
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.DB_URI)
        console.log("DB done")
    }
    catch(error){
        console.log(error.message)
        process.exit(1)
    }

}
ConnectDB()


// 
app.get('/', (req, res) => {
    res.status(200).json({message:"hello user"})
})

// auth routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoute)
app.use('/api/users', usersRouter)
app.use('/api', relationshipsRouter)

// not found routes
app.use((req, res) => {
    res.status(404).json({message:`Route ${req.originalUrl} not found.`})
})

// error middleWare
app.use((err, req, res, next) => {
    console.log(err)
    return res.status(500).send({message:"fail", error:err.message})
})


// if (process.env.NODE_ENV !== 'production') { 
  const Port = process.env.PORT || 5000
  app.listen(Port, () => console.log(`Server running on port ${Port}...`))
// }

// when deploy on vercel 
// export default app


