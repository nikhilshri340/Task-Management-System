import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authroutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Management System API Running",
  });
});

app.use("/api/auth", authroutes);

export default app;