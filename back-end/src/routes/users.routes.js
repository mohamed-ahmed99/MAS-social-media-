import { Router } from "express";
import getMyProfile from '../controllers/users/getMyProfile.js';
import getUserKey from '../controllers/users/getUserKey.js';
import getUsers from '../controllers/users/getUsers.js';
import getUser from '../controllers/users/getUser.js';
import updateMyProfile from '../controllers/users/updateMyProfile.js';
import { verifyToken } from "../middlewares/verifyToken.js";

const usersRouter = Router();


// get my profile
usersRouter.get('/me/profile', verifyToken("MASproAuth"), getMyProfile)


// get one key of user
usersRouter.get('/user-key', verifyToken("MASproAuth"), getUserKey) 


// get all users
usersRouter.get('/get-users', verifyToken("MASproAuth"), getUsers) 


// get one user
usersRouter.get('/getuser/:userId', verifyToken("MASproAuth"), getUser) 

// update my profile
usersRouter.patch('/me/update', verifyToken("MASproAuth"), updateMyProfile) 




export default usersRouter;