import express from "express";

import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasks);

router.post("/", createTask);

router.put(
  "/:id",
  updateTaskStatus
);

router.delete(
  "/:id",
  deleteTask
);

export default router;