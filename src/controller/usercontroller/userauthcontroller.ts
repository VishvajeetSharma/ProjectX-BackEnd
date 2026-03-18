import { error } from "node:console";
import { message } from "../../entities/message";
import { users } from "../../entities/user";
import 'dotenv/config'
import { createResponse } from "../../helpers/createResponse";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { generateToken } from "../../helpers/jwt";
export const userRegister = async (req: any, res: any) => {
 try{
 const { name, email, password="Test@12345", mobile } = req.body;
  const isExist = await users.findOne({ where: { email: email } });
  if (isExist) {
    return createResponse(res, false, 400, "User already exists", [], true);
  }else{
    const hashedPassword=await bcrypt.hash(password,10)
    const result= await users.save({name,email,mobile,password:hashedPassword})
    return createResponse(res, true, 201, "User register successfully", result, false);
  }
 }catch(error){
 return createResponse(res, false, 500, "Internal Server Error", [], true);
 }
};

export const userLogin = async (req: any, res: any) => {
  const {email,password}=req.body;
 try{  
    const isExist = await users.findOne({ where: { email } });
     if(!isExist){
      return createResponse(res, false, 404, "User Not Found", [], true);
     }else{
         const isMatched=await bcrypt.compare(password,isExist?.password);
         if(!isMatched){
           return createResponse(res, false, 404, "Please enter valid password", [], true);
         }else{
          const payload={email:isExist?.email,id:isExist?.id}
          const token=generateToken(payload)
          
           return createResponse(res, true, 200, "Login successfull",{ ...isExist,token}, false,);
         }
     } 
 }catch(error){
 return createResponse(res, false, 500, "Internal Server Error", [], true);
 }
};
