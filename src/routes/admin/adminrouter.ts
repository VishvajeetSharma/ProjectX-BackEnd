import express from 'express';
import { adminLogin, adminRegister } from '../../controller/admincontroller/adminauthcontroller';
import { createmastercourse, getmastercourse, getmastercoursebyid, updatemastercourse, deletemastercourse, createmasterplan, getmasterplan, getmasterplanbyid, updatemasterplan, deletemasterplan, getUsers } from '../../controller/admincontroller/mastermasterdata';

const adminRouter=express.Router();

adminRouter.post("/register", adminRegister)
adminRouter.post("/login", adminLogin)

adminRouter.post("/create-master-plan", createmasterplan) 
adminRouter.get("/get-master-plan", getmasterplan)
adminRouter.get("/get-master-plan/:id", getmasterplanbyid)
adminRouter.put("/update-master-plan/:id", updatemasterplan)
adminRouter.delete("/delete-master-plan/:id", deletemasterplan)

adminRouter.post("/create-master-course", createmastercourse) 
adminRouter.get("/get-master-course", getmastercourse)
adminRouter.get("/get-master-course/:id", getmastercoursebyid)
adminRouter.put("/update-master-course/:id", updatemastercourse)
adminRouter.delete("/delete-master-course/:id", deletemastercourse)

adminRouter.get("/get-users", getUsers);

export default adminRouter;