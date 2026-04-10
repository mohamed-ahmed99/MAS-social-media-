import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Sessions from '../models/userSessions.model.js'

dotenv.config()


export const verifyToken = (cookieName, ...allowedRoles) => (async(req, res, next) => {

    // get token
    const token = req.cookies[cookieName]
    if(!token) {
        return res.status(401).json({status:"fail", message: "No token provided" })
    }

    // verify token
    let decodedToken
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({status:"fail", message: "Invalid token" })
    }

    // check if user has allowed role
    if(allowedRoles.length > 0 && !allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({status:"fail", message: "You don't have permission to access this resource" })
    }

    // check if token exist in DB
    const userSession = await Sessions.find({user:decodedToken._id})
    if(userSession.length === 0) {
        return res.status(401).json({status:"fail", message: "Invalid token" })
    }

    const session = userSession.find(session => session.token === token)
    if(!session) {
        return res.status(401).json({status:"fail", message: "Invalid token" })
    }

    // check if token expired
    if(session.expiresAt < Date.now()){
        return res.status(401).json({status:"fail", message: "Token expired" })
    }

    // attach user to request
    req.user = decodedToken
    next()
    
})