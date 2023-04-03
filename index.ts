import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Note } from "./types";
import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import credentials from "./middlewares/credentials";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 8080;

const app: Express = express();

app.use(credentials);

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "https://notify-client-neon.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

app.post("/create-checkout-session", async (req: Request, res: Response) => {
  const { product } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Notify Monthly Subscription",
          },
          unit_amount: 9 * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:
      process.env.CLIENT_URL + "home" ||
      "https://notify-client-neon.vercel.app/home",
    cancel_url:
      process.env.CLIENT_URL + "premium" ||
      "https://notify-client-neon.vercel.app/premium",
  });
  res.json({ url: session.url });
});

const DB_URI = process.env.DB_URI as string;

mongoose.set("strictQuery", false); // this line suppresses the deprecation warning.
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
