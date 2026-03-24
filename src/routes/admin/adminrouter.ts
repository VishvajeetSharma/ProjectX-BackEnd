import express from 'express';
import { adminLogin, adminRegister } from '../../controller/admincontroller/adminauthcontroller';
import { createmasterplan, getmasterplan } from '../../controller/admincontroller/mastermasterdata';
const adminRouter=express.Router();

adminRouter.post("/register", adminRegister)
adminRouter.post("/login", adminLogin)

// master plan
adminRouter.post("/create-master-plan", createmasterplan) 
adminRouter.get("/get-master-plan", getmasterplan) 
export default adminRouter;