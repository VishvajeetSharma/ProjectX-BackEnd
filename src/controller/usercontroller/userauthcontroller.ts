import { users } from "../../entities/user";
import "dotenv/config";
import { createResponse } from "../../helpers/createResponse";
import bcrypt from "bcrypt";
import { generateToken } from "../../helpers/jwt";
import nodemailer from 'nodemailer';
export const userRegister = async (req: any, res: any) => {
  try {
    const { name, email, password = "Test@12345", mobile } = req.body;
    const isExist = await users.findOne({ where: { email: email } });
    if (isExist) {
      return createResponse(res, false, 400, "User already exists", [], true);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await users.save({
        name,
        email,
        mobile,
        password: hashedPassword,
      });
      return createResponse(
        res,
        true,
        201,
        "User register successfully",
        result,
        false,
      );
    }
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};
export const userLogin = async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const isExist = await users.findOne({ where: { email } });
    if (!isExist) {
      return createResponse(res, false, 404, "User Not Found", [], true);
    } else {
      const isMatched = await bcrypt.compare(password, isExist?.password);
      if (!isMatched) {
        return createResponse(
          res,
          false,
          404,
          "Please enter valid password",
          [],
          true,
        );
      } else {
        const payload = { email: isExist?.email, id: isExist?.id };
        const token = generateToken(payload);

        return createResponse(
          res,
          true,
          200,
          "Login successfull",
          { ...isExist, token },
          false,
        );
      }
    }
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};

export const userForgetPassword = async (req: any, res: any) => {
  const { email } = req.body;
  try {
    let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'vsharma6705@gmail.com',
                pass: 'hljx cwze xfqn vqyg'
            }
        }
    );

let mailDetails = {
    from: 'vsharma6705@gmail.com',
    to: 'ravilms@yopmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
};

await mailTransporter
    .sendMail(mailDetails,
        function (err, data) {
            if (err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
        
    return createResponse(res, true, 200, "okkk", { email }, false);
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};
