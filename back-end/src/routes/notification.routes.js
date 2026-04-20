import {Router} from 'express'
import {getNotifications} from "../controllers/notifications.controller.js"
import { verifyToken } from '../middlewares/verifyToken.js'

const notificationRoutes = Router()

notificationRoutes.get('/get', verifyToken("MASproAuth"), getNotifications)



export default notificationRoutes

