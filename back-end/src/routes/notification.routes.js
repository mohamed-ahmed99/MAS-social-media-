import {Router} from 'express'
import {getNotifications} from "../controllers/notifications.controller.js"
import { checkAuth } from '../middlewares/checkAuth.js'

// import {ROLES} from '../config/constants.js'

const notificationRoutes = Router()

notificationRoutes.get('/get-notifications', checkAuth(), getNotifications)



export default notificationRoutes

