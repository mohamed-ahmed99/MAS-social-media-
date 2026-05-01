import { Router } from "express";
import { createReaction } from "../controllers/reactions/createReaction.js";
import {verifyToken} from "../middlewares/verifyToken.js"

const reactionRoutes = Router();

// create reaction
reactionRoutes.post('/:postId',verifyToken("MASproAuth"), createReaction)




export default reactionRoutes;
