import {Router} from 'express'
import { SignUp } from '../controllers/auth.controller.js'
import {registerValidator} from '../validators/auth.validators.js'

const authRoutes = Router()

authRoutes.post('/signup', registerValidator, SignUp)


export default authRoutes

