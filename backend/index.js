import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import listingRouter from "./routes/listing.routes.js";
import bookingRouter from "./routes/booking.route.js";

import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json())

app.use(cookieParser())
app.use(cors({
  origin:"https://stayhub-demo.onrender.com",
  credentials:true
}))
const port = process.env.PORT || 5000;

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);
app.use("/api/booking", bookingRouter);

const startServer = async () => {
  try {
    await connectDb(); // DB first
    console.log("✅ MongoDB connected");

    app.listen(port, () => {
      console.log(`🚀 Server started on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
