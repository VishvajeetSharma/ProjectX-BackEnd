import express from 'express';
import { adminLogin, adminRegister } from '../../controller/admincontroller/adminauthcontroller';
import { createmastercourse, getmastercourse, getmastercoursebyid, updatemastercourse, deletemastercourse, createmasterplan, getmasterplan, getmasterplanbyid, updatemasterplan, deletemasterplan, getUsers } from '../../controller/admincontroller/mastermasterdata';
import { validateMiddleware } from '../../middleware/validationMiddleware';
import { verifyToken } from '../../middleware/authMiddleware';

const adminRouter=express.Router();

adminRouter.post("/register", validateMiddleware, adminRegister)
adminRouter.post("/login", validateMiddleware, adminLogin)

adminRouter.post("/create-master-plan", verifyToken, validateMiddleware, createmasterplan) 
adminRouter.get("/get-master-plan", verifyToken, getmasterplan)
adminRouter.get("/get-master-plan/:id",verifyToken, getmasterplanbyid)
adminRouter.put("/update-master-plan/:id", verifyToken, validateMiddleware, updatemasterplan)
adminRouter.delete("/delete-master-plan/:id", verifyToken, deletemasterplan)

adminRouter.post("/create-master-course", verifyToken, validateMiddleware, createmastercourse) 
adminRouter.get("/get-master-course", verifyToken, getmastercourse)
adminRouter.get("/get-master-course/:id", verifyToken, getmastercoursebyid)
adminRouter.put("/update-master-course/:id", verifyToken, validateMiddleware, updatemastercourse)
adminRouter.delete("/delete-master-course/:id", verifyToken, deletemastercourse)

adminRouter.get("/get-users", verifyToken, getUsers);

export default adminRouter;