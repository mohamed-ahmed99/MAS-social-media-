import {Router} from 'express'
import { SignUp, SignIn, VerifyEmail, VerifyMe } from '../controllers/auth.controller.js'
import {registerValidator, signinValidator} from '../validators/auth.validators.js'
import {checkAuth} from '../middlewares/checkAuth.js'
import {verifyToken} from '../middlewares/verifyToken.js'
// import {ROLES} from '../config/constants.js'

const authRoutes = Router()

/**
    * auth routes
*/

// sign up
authRoutes.post('/signup', registerValidator, SignUp)


// sign in
authRoutes.post('/signin', signinValidator, SignIn)


// verify email
authRoutes.post('/verify-email',verifyToken("MASproAuth"), VerifyEmail)


// verify me
authRoutes.get('/verify-me', verifyToken("MASproAuth"), VerifyMe)


// get user key
authRoutes.get('/getuser/key', checkAuth(), VerifyMe)

export default authRoutes

