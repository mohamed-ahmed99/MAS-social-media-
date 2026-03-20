import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import wrapperMD from './wrapperMD.js'
import Sessions from '../models/userSessions.model.js'

dotenv.config()


export const verifyToken = (cookieName) => wrapperMD(async(req, res, next) => {

    // get token
    const token = req.cookies[cookieName]
    if(!token) return res.status(401).json({ message: "No token provided" })

    // verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if(!decodedToken) return res.status(401).json({ message: "Invalid token" })

    // check if token exist in DB
    const userSession = await Sessions.findOne({user:decodedToken._id})
    if(!userSession) return res.status(401).json({ message: "Invalid token" })

    const session = userSession.sessions.find(session => session.token === token)
    if(!session) return res.status(401).json({ message: "Invalid token" })

    // check if token expired
    if(session.expiresAt < Date.now()) return res.status(401).json({ message: "Token expired" })

    // attach user to request
    req.user = decodedToken
    next()
    
})