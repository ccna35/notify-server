import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/userModel";

dotenv.config();

const SECRET_KEY: Secret | undefined = process.env.MY_SECRET;

// Handling the signup process.
const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password, secondPassword } = req.body;

  if (password === secondPassword) {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    try {
      await newUser.save();
      const userId = newUser._id;
      let token = jwt.sign({ userId }, SECRET_KEY as string, {
        expiresIn: "1h",
      });

      res.status(201).json({
        success: true,
        data: {
          userData: {
            id: newUser?._id,
            email: newUser?.email,
            firstName: newUser?.firstName,
            lastName: newUser?.lastName,
          },
          token,
        },
      });
    } catch {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
  } else {
    res.status(400).json({ message: "Passwords don't match" });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res
      .status(404)
      .send({ message: "This user doesn't exist, please sign up!" });
  } else {
    const passwordsMatch = await bcrypt.compare(password, user!.password);

    if (passwordsMatch) {
      try {
        const userId = user?._id;
        let token = jwt.sign({ userId }, SECRET_KEY as string, {
          expiresIn: "1h",
        });

        res.status(201).json({
          success: true,
          data: {
            userData: {
              id: user?._id,
              email: user?.email,
              firstName: user?.firstName,
              lastName: user?.lastName,
            },
            token,
          },
        });
      } catch {
        const error = new Error("Error! Something went wrong.");
        return next(error);
      }
    } else {
      res.status(400).send({ message: "Password is incorrect" });
    }
  }
};

export { signUp, login };
