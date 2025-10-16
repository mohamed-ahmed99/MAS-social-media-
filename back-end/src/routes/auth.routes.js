import {Router} from 'express'
import { SignUp, SignIn, VerifyEmail } from '../controllers/auth.controller.js'
import {registerValidator, signinValidator} from '../validators/auth.validators.js'

const authRoutes = Router()

authRoutes.post('/signup', registerValidator, SignUp)
authRoutes.post('/signin', signinValidator, SignIn)
authRoutes.post('/verify-email', VerifyEmail)


export default authRoutes

