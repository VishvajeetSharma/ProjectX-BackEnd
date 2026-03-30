import { users } from "../../entities/user";
import "dotenv/config";
import { createResponse } from "../../helpers/createResponse";
import bcrypt from "bcrypt";
import { generateToken } from "../../helpers/jwt";
import nodemailer from "nodemailer";
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

const generatePassword = () => {
  let pass = "";
  let str = "A1234B569!*&^#%#CDE7543FGHIJKLMNOPQRSTUVWXYZ233%%909";
  for (let i = 0; i <= 8; i++) {
    const randIndex = Math.ceil(Math.random() * 10);
    pass += str[randIndex];
  }
  return pass;
};
export const userForgetPassword = async (req: any, res: any) => {
  const { email } = req.body;
  try {
    const isExists = await users.findOne({ where: { email } });
    if (!isExists) {
      return createResponse(res, false, 404, "User Not Found", [], true);
    } else {
      let password = generatePassword();

      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "vsharma6705@gmail.com",
          pass: "hljx cwze xfqn vqyg",
        },
      });

      let mailDetails = {
        from: "vsharma6705@gmail.com",
        to: `${email}`,
        subject: "Test mail",
        text: "",
        html: `<html>
        <head>
            <style>
                body { font-family: sans-serif; }
                .container { padding: 20px; background-color: #f5f7fa; }
                h1 { color: #333; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome, User!</h1>
                <p>Your Password id : ${password}</p>
                <a href="https://example.com" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    Visit our website
                </a>
            </div>
        </body>
        </html>`,
      };

      await mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("Email sent successfully");
        }
      });
      const hashedPassword: any = await bcrypt.hash(password, 10);
    const result=  await users.update({ email }, { password: hashedPassword });
      return createResponse(res, true, 200, "Password Updated succesfully , Please check your email and login.",result, false);
    }
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};

export const userUpdatePassword = async (req: any, res: any) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // Assuming from auth middleware

  try {
    const user = await users.findOne({ where: { id: userId } });
    if (!user) {
      return createResponse(res, false, 404, "User not found", [], true);
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return createResponse(res, false, 400, "Old password is incorrect", [], true);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    return createResponse(res, true, 200, "Password updated successfully", [], false);
  } catch (error) {
    return createResponse(res, false, 500, "Internal Server Error", [], true);
  }
};
