import express from "express";
import "dotenv/config";
import cors from "cors";
import { AppDataSource } from "./dbconfig/dbconfig";
const app = express();
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
app.listen(PORT, () => {
  console.log("server is running on port:" + PORT);
});
