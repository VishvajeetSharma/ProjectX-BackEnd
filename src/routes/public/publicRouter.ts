import express from "express";
import { getRecMasterPlan } from "../../controller/public/publicMasterDataController";

const publicRouter = express.Router();

publicRouter.get("/get-rec-plan",  getRecMasterPlan); 

export default publicRouter;
