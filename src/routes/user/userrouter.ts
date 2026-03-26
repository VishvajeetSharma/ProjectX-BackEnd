import express from "express";
import { userLogin, userRegister } from "../../controller/usercontroller/userauthcontroller";
import { validateMiddleware } from "../../middleware/validationMiddleware";
import { verifyToken } from "../../middleware/authMiddleware";
import { usergetmasterplan } from "../../controller/usercontroller/usermastermasterdata";
const userRouter = express.Router();
userRouter.post("/register", validateMiddleware, userRegister);  
userRouter.post("/login", validateMiddleware, userLogin);

userRouter.get("/user-master-plan",verifyToken,  usergetmasterplan); 
export default userRouter;
