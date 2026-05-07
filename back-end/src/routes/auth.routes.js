import {Router} from 'express'
import {registerValidator, signinValidator} from '../validators/auth.validators.js'
import {verifyToken} from '../middlewares/verifyToken.js'

// functions
import SignIn from '../controllers/auth/signIn.js'
import SignUp from '../controllers/auth/signUp.js'
import VerifyEmail from '../controllers/auth/verifyEmail.js'
import VerifyMe from '../controllers/auth/verifyMe.js'


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



export default authRoutes

