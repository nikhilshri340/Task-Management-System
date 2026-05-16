import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      stats: {
        totalProjects: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;