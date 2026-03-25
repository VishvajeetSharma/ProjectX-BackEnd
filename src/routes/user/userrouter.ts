import express from "express";
import { userLogin, userRegister } from "../../controller/usercontroller/userauthcontroller";
import { validateMiddleware } from "../../middleware/validationMiddleware";
const userRouter = express.Router();
userRouter.post("/register", validateMiddleware, userRegister);  
userRouter.post("/login", validateMiddleware, userLogin);
export default userRouter;
