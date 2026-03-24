import express from 'express';
import { adminLogin, adminRegister } from '../../controller/admincontroller/adminauthcontroller';
import { createmastercourse, createmasterplan, getmasterplan } from '../../controller/admincontroller/mastermasterdata';
const adminRouter=express.Router();

adminRouter.post("/register", adminRegister)
adminRouter.post("/login", adminLogin)

// master plan
adminRouter.post("/create-master-plan", createmasterplan) 
adminRouter.get("/get-master-plan", getmasterplan) 

// master course
adminRouter.post("/create-master-course", createmastercourse) 
adminRouter.get("/get-master-course", getmasterplan) 
export default adminRouter;