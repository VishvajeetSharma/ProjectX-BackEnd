import express from "express";
import { userLogin, userRegister } from "../../controller/usercontroller/userauthcontroller";
import { validateMiddleware } from "../../middleware/validationMiddleware";
import { verifyToken } from "../../middleware/authMiddleware";
import { usergetmasterplan, userPurchasedplan, userPurchaseplan, userViewCourse } from "../../controller/usercontroller/usermastermasterdata";
const userRouter = express.Router();
userRouter.post("/register", validateMiddleware, userRegister);  
userRouter.post("/login", validateMiddleware, userLogin);

userRouter.get("/user-master-plan", usergetmasterplan);
userRouter.post("/user-purchase-plan",verifyToken,userPurchaseplan); 
userRouter.get("/user-purchased-plan",verifyToken,userPurchasedplan); 
userRouter.get("/user-view-course",verifyToken,userViewCourse);
export default userRouter;
