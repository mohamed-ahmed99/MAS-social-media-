import { Router } from "express";
import {getUserKey} from '../controllers/users.controller.js';
import { checkAuth } from "../middlewares/checkAuth.js";

const usersRouter = Router();


usersRouter.get('/user-key', checkAuth(), getUserKey)







export default usersRouter;