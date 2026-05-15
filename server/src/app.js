import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/*
=================================
Middleware
=================================
*/

app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
/*
=================================
Health Route
=================================
*/

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Management System API Running",
  });
});

export default app;