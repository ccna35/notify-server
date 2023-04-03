import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/userModel";

dotenv.config();

const SECRET_KEY: Secret | undefined = process.env.MY_SECRET;

// handles login process
const login = async (req: Request, res: Response, next: NextFunction) => {
  let { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch {
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }
  if (!existingUser || existingUser.password != password) {
    const error = Error("Wrong details please check at once");
    return next(error);
  }
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      SECRET_KEY as string,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error! Something went wrong.");
    return next(error);
  }

  res.status(200).json({
    success: true,
    data: {
      userId: existingUser.id,
      token: token,
    },
  });
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  // Get token value to the json body
  const token: string = req.headers.authorization?.split(" ")[1] as string;

  try {
    // Verify the token is valid
    jwt.verify(token, SECRET_KEY as string);

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Protect middleware: Not Authorized" });
  }
};

export { protect };
