import { Router } from "express";
import { toMe, acceptFriend, fromMe, deleteRelationship} from "../controllers/relationship.controller.js"; 
import { verifyToken } from "../middlewares/verifyToken.js";
import buildRelationship from "../controllers/relationships/buildRelationship.js"

const relationshipsRouter = Router();



// build a relationship
relationshipsRouter.post("/relationship/build", verifyToken("MASproAuth"), buildRelationship)



relationshipsRouter.get("/relationship/users", verifyToken("MASproAuth"), toMe)
relationshipsRouter.patch("/relationship/accept-friend", verifyToken("MASproAuth"), acceptFriend)
relationshipsRouter.get("/relationship/me", verifyToken("MASproAuth"), fromMe)

relationshipsRouter.delete("/relationship/me/:targetUserId", verifyToken("MASproAuth"), deleteRelationship)


export default relationshipsRouter;