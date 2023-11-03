import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import users from "./routes/users";
import notes from "./routes/notes";
import categories from "./routes/categories";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "https://notify-client-neon.vercel.app"],
  })
);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/users", users);
app.use("/notes", notes);
app.use("/categories", categories);

app.get("/logout", (req, res) => {
  console.log("Logout router");

  res.clearCookie("jwt");
  res.status(200).send("User logged out successfully");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.post("/create-checkout-session", async (req: Request, res: Response) => {
//   const { product } = req.body;
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "Notify Monthly Subscription",
//           },
//           unit_amount: 9 * 100,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url:
//       process.env.CLIENT_URL + "home" ||
//       "https://notify-client-neon.vercel.app/home",
//     cancel_url:
//       process.env.CLIENT_URL + "premium" ||
//       "https://notify-client-neon.vercel.app/premium",
//   });
//   res.json({ url: session.url });
// });
