import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Users from '../models/user.schema.js'
import wrapperMD from './wrapperMD.js'
import Sessions from '../models/userSessions.model.js'

dotenv.config()

export const checkAuth = wrapperMD(async(req, res, next) => {
    // get token
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({ message: "No token provided" })
        
    // token exist?
    const token = authorization.split(" ")[1]
    if (!token)
        return res.status(401).json({ message: "Invalid authorization format" })

    const decoded = jwt.verify(token, process.env.JWT_SECRET) // check token

    // is token in DataBase
    const user = await Sessions.find({user:decoded._id, "sessions.token": token})
    if (!user)
        return res.status(401).json({ message: "Session expired or invalid token" });

    req.decoded = { ...decoded };
    next()
})