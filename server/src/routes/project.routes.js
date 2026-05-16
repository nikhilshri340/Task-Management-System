import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      projects: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project: {
        title,
        description,
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