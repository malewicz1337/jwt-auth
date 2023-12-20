import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import router from "./router/index.js";
import errorMiddleware from "./middlewares/error-middleware.js";

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log("Error at start: ", e);
  }
};

start();
