import express from "express";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";
import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
  addMember,
  removeMember,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getProjects);
router.put("/:id", updateProject);

router.post("/", createProject);

router.delete(
  "/:id",
  deleteProject
);
router.post(
  "/:id/members",
  protect,
  adminOnly,
  addMember
);

router.delete(
  "/:projectId/members/:userId",
  protect,
  adminOnly,
  removeMember
);
router.get("/", protect, getProjects);

router.post(
  "/",
  protect,
  adminOnly,
  createProject
);

router.put(
  "/:id",
  protect,
  updateProject
);

router.delete(
  "/:id",
  protect,
  deleteProject
);
export default router;