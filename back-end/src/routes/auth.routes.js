import {Router} from 'express'
import { SignUp, SignIn, VerifyEmail, VerifyMe } from '../controllers/auth.controller.js'
import {registerValidator, signinValidator} from '../validators/auth.validators.js'
import {checkAuth} from '../middlewares/checkAuth.js'

const authRoutes = Router()

authRoutes.post('/signup', registerValidator, SignUp)
authRoutes.post('/signin', signinValidator, SignIn)
authRoutes.post('/verify-email', VerifyEmail)
authRoutes.get('/verify-me', checkAuth, VerifyMe)


export default authRoutes

