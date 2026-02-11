import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import categoriesRouter from "./routes/categoriesRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";
import budgetRouter from "./routes/budgetRoutes.js";

// express setup
const app = express();
const PORT = process.env.PORT || 5000;

// cloudinary setup
await connectCloudinary();

// determine environement
const isProduction = (process.env.NODE_ENV || "development") === "production";
const allowedOrigins = (
  isProduction ? process.env.PROD_ORIGINS : process.env.DEV_ORIGINS
)?.split(",");

// middlewares
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));

// test route
app.get("/", (req, res) => {
  res.send(
    `server is running on port ${PORT} and is on ${isProduction ? "production" : "development"} environment`,
  );
});

// rest of routes
app.use("/api/auth", userRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/budget", budgetRouter);

// connect to database
await connectDB();

// start server
app.listen(PORT, () =>
  console.log(
    `Server is running on port ${PORT} and is on ${isProduction ? "production" : "development"} environment`,
  ),
);
