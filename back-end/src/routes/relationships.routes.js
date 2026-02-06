import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { makeRelationship, toMe, acceptFriend, fromMe} from "../controllers/relationship.controller.js"; 


const relationshipsRouter = Router();



relationshipsRouter.post("/relationship", checkAuth(), makeRelationship)
relationshipsRouter.get("/relationship/users", checkAuth(), toMe)
relationshipsRouter.patch("/relationship/accept-friend", checkAuth(), acceptFriend)
relationshipsRouter.get("/relationship/me", checkAuth(), fromMe)



export default relationshipsRouter;