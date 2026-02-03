import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { makeFriends } from "../controllers/relationship.controller.js"; 


const relationshipsRouter = Router();



relationshipsRouter.post("/relationships", checkAuth(), makeFriends)




export default relationshipsRouter;