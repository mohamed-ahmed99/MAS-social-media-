import {Router} from 'express'
import { SignIn } from '../controllers/auth.controller.js'

const authRoutes = Router()

authRoutes.post('/signin', SignIn)


export default authRoutes

