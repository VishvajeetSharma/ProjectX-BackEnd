import express from "express";
import "dotenv/config";
import cors from "cors";
import { AppDataSource } from "./dbconfig/dbconfig";
import userRouter from "./routes/user/userrouter";
import adminRouter from "./routes/admin/adminrouter";
import expressfileupload from "express-fileupload";
const app = express();
app.use(expressfileupload());
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully..");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/user", userRouter);   
app.use("/admin", adminRouter); 
app.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
});
