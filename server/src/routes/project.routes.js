const express = require("express");

const {
  createProject,
  getProjects,
  getSingleProject,
  addMember,
  removeMember,
} = require("../controllers/project.controller");

const protect = require("../middleware/auth.middleware");

const router = express.Router();

/*
=================================
Create Project
=================================
*/

router.post("/", protect, createProject);

/*
=================================
Get All Projects
=================================
*/

router.get("/", protect, getProjects);

/*
=================================
Get Single Project
=================================
*/

router.get("/:id", protect, getSingleProject);

/*
=================================
Add Member
=================================
*/

router.post("/:id/members", protect, addMember);

/*
=================================
Remove Member
=================================
*/

router.delete(
  "/:id/members/:memberId",
  protect,
  removeMember
);

module.exports = router;