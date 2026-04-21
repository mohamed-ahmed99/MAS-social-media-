import { Router } from "express";
import { fromMe, deleteRelationship} from "../controllers/relationship.controller.js"; 
import { verifyToken } from "../middlewares/verifyToken.js";
import buildRelationship from "../controllers/relationships/buildRelationship.js"
import acceptFriendRequest from "../controllers/relationships/acceptFriendRequest.js"
import getRelationsToMe from "../controllers/relationships/getRelationsToMe.js"

const relationshipsRouter = Router();



// build a relationship
relationshipsRouter.post("/relationship/build/:targetUserId", verifyToken("MASproAuth"), buildRelationship)

// accept friend request
relationshipsRouter.patch(
    "/relationship/accept-friend-request/:fromUserId", 
    verifyToken("MASproAuth"), 
    acceptFriendRequest
)

// get all who follow me or sent a friend request to me or blocked me 
relationshipsRouter.get("/relationship/to-me", verifyToken("MASproAuth"), getRelationsToMe)




relationshipsRouter.get("/relationship/me", verifyToken("MASproAuth"), fromMe)
relationshipsRouter.delete("/relationship/me/:targetUserId", verifyToken("MASproAuth"), deleteRelationship)


export default relationshipsRouter;