import { Router } from "express";
import {getUserKey, getUsers} from '../controllers/users.controller.js';
import { checkAuth } from "../middlewares/checkAuth.js";

const usersRouter = Router();


usersRouter.get('/user-key', checkAuth(), getUserKey)
usersRouter.get('/get-users', checkAuth(), getUsers)







export default usersRouter;