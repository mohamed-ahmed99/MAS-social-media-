import { Router } from "express";
import createReaction from "../controllers/reactions/createReaction.js";
import {verifyToken} from "../middlewares/verifyToken.js"
import inactivateReactionStatus from "../controllers/reactions/inactivateReactionStatus.js";

const reactionRoutes = Router();

// create reaction
reactionRoutes.post('/create/:postId',verifyToken("MASproAuth"), createReaction)

// inactivate reaction status
reactionRoutes.delete('/:postId/inactivate',verifyToken("MASproAuth"), inactivateReactionStatus)

export default reactionRoutes;
