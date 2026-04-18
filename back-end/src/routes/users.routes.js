import { Router } from "express";
import {getMyProfile, 
    getUserKey, 
    getUsers, 
    suggestFriends, 
    getUser, 
    updateMyProfile
} from '../controllers/users.controller.js';
import { verifyToken } from "../middlewares/verifyToken.js";

const usersRouter = Router();


// get my profile
usersRouter.get('/me/profile', verifyToken("MASproAuth"), getMyProfile)


// get one key of user
usersRouter.get('/user-key', verifyToken("MASproAuth"), getUserKey) 


// get all users
usersRouter.get('/get-users', verifyToken("MASproAuth"), getUsers) 


// suggest friends
usersRouter.get('/get', verifyToken("MASproAuth"), suggestFriends) 


// get one user
usersRouter.get('/getuser/:userId', verifyToken("MASproAuth"), getUser) 

// update my profile
usersRouter.patch('/me/update', verifyToken("MASproAuth"), updateMyProfile) 




export default usersRouter;