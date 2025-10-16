import {Router} from 'express'
import { SignUp, SignIn } from '../controllers/auth.controller.js'
import {registerValidator, signinValidator} from '../validators/auth.validators.js'

const authRoutes = Router()

authRoutes.post('/signup', registerValidator, SignUp)
authRoutes.post('/signin', signinValidator, SignIn)


export default authRoutes

