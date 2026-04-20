import { Router } from "express";
import { makeRelationship, toMe, acceptFriend, fromMe, deleteRelationship} from "../controllers/relationship.controller.js"; 
import { verifyToken } from "../middlewares/verifyToken.js";

const relationshipsRouter = Router();



// build a relationship
relationshipsRouter.post("/relationship/build", verifyToken("MASproAuth"), makeRelationship)



relationshipsRouter.get("/relationship/users", verifyToken("MASproAuth"), toMe)
relationshipsRouter.patch("/relationship/accept-friend", verifyToken("MASproAuth"), acceptFriend)
relationshipsRouter.get("/relationship/me", verifyToken("MASproAuth"), fromMe)

relationshipsRouter.delete("/relationship/me/:targetUserId", verifyToken("MASproAuth"), deleteRelationship)


export default relationshipsRouter;