import express from "express";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";
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
router.get("/", protect, getTasks);

router.post(
  "/",
  protect,
  adminOnly,
  createTask
);

router.put(
  "/:id",
  protect,
  updateTaskStatus
);

router.delete(
  "/:id",
  protect,
  deleteTask
);
export default router;