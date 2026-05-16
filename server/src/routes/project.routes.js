import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  getProjects,
  createProject,
  deleteProject,
} from "../controllers/project.controller.js";

const router = express.Router();

/*
=================================
Get Projects
=================================
*/

router.get(
  "/",
  protect,
  getProjects
);

/*
=================================
Create Project
=================================
*/

router.post(
  "/",
  protect,
  createProject
);

/*
=================================
Delete Project
=================================
*/

router.delete(
  "/:id",
  protect,
  deleteProject
);

export default router;