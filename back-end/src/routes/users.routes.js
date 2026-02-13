import { Router } from "express";
import {getUserKey, getUsers, suggestFriends, getUser} from '../controllers/users.controller.js';
import { checkAuth } from "../middlewares/checkAuth.js";

const usersRouter = Router();


usersRouter.get('/user-key', checkAuth(), getUserKey) // one key of user
usersRouter.get('/get-users', checkAuth(), getUsers) // I'll remove this later
// usersRouter.get('/me/relationships', checkAuth(), getUsers)


usersRouter.get('/get', checkAuth(), suggestFriends) // suggest friends

usersRouter.get('/getuser/:userId', checkAuth(), getUser) // get one user









export default usersRouter;