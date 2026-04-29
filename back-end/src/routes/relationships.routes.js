import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import buildRelationship from "../controllers/relationships/buildRelationship.js"
import acceptFriendRequest from "../controllers/relationships/acceptFriendRequest.js"
import getRelationsToMe from "../controllers/relationships/getRelationsToMe.js"
import getRelationsFromMe from "../controllers/relationships/getRelationsFromMe.js"
import deleteRealtionship from "../controllers/relationships/deleteRealtionship.js"
import suggestFriends from "../controllers/relationships/suggestFriends.js"
import updateRelationStatus from "../controllers/relationships/updateRelationStatus.js"

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

// get all who i follow or sent a friend request to or blocked 
relationshipsRouter.get("/relationship/from-me", verifyToken("MASproAuth"), getRelationsFromMe)

// delete a relationship
relationshipsRouter.delete("/relationship/delete/:targetUserId", verifyToken("MASproAuth"), deleteRealtionship)


// suggest friends
relationshipsRouter.get("/relationship/suggest-friends", verifyToken("MASproAuth"), suggestFriends)

// update relationship status
relationshipsRouter.patch("/relationship/update-status/:targetUserId", verifyToken("MASproAuth"), updateRelationStatus)


export default relationshipsRouter;