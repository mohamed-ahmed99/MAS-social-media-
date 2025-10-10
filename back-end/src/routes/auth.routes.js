import {Router} from 'express'
import { SignUp } from '../controllers/auth.controller.js'

const authRoutes = Router()

authRoutes.post('/signin', SignUp)


export default authRoutes

