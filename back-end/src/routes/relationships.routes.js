import { Router } from "express";
import { checkAuth } from "../middlewares/checkAuth.js";
import { makeRelationship } from "../controllers/relationship.controller.js"; 


const relationshipsRouter = Router();



relationshipsRouter.post("/relationships", checkAuth(), makeRelationship)




export default relationshipsRouter;