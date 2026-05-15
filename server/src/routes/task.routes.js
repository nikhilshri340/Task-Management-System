const express = require("express");

const {
  createTask,
  getProjectTasks,
  updateTaskStatus,
  updateTask,
  deleteTask,
  filterTasks,
} = require("../controllers/task.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

/*
=================================
Create Task
=================================
*/

router.post("/", protect, createTask);

/*
=================================
Get Project Tasks
=================================
*/

router.get(
  "/project/:projectId",
  protect,
  getProjectTasks
);

/*
=================================
Filter/Search Tasks
=================================
*/

router.get(
  "/project/:projectId/filter",
  protect,
  filterTasks
);

/*
=================================
Update Task Status
=================================
*/

router.patch(
  "/:taskId/status",
  protect,
  updateTaskStatus
);

/*
=================================
Update Task
=================================
*/

router.patch(
  "/:taskId",
  protect,
  updateTask
);

/*
=================================
Delete Task
=================================
*/

router.delete(
  "/:taskId",
  protect,
  deleteTask
);

module.exports = router;