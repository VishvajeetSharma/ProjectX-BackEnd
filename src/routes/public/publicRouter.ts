import express from "express";
import { getRecMasterPlan } from "../../controller/public/publicMasterDataController";

const publicRouter = express.Router();

publicRouter.get("/user-master-plan",  getRecMasterPlan); 

export default publicRouter;
