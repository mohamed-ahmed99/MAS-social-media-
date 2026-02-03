import { Router } from "express";
import {getUserKey, getUsers, suggestFriends} from '../controllers/users.controller.js';
import { checkAuth } from "../middlewares/checkAuth.js";

const usersRouter = Router();


usersRouter.get('/user-key', checkAuth(), getUserKey)
usersRouter.get('/get-users', checkAuth(), getUsers)
// usersRouter.get('/me/relationships', checkAuth(), getUsers)


usersRouter.get('/get', checkAuth(), suggestFriends)









export default usersRouter;