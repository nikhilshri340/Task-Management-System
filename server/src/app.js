const dashboardRoutes = require("./routes/dashboard.routes");
const taskRoutes = require("./routes/task.routes");
const projectRoutes = require("./routes/project.routes");
const testRoutes = require("./routes/test.routes");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");



const app = express();


/*
=================================
Middlewares
=================================
*/

app.use(cors());

app.use(express.json());

app.use(helmet());

app.use(morgan("dev"));

/*
=================================
Test Route
=================================
*/

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Management System API Running",
  });
});

/*
=================================
Export App
=================================
*/
app.use("/api/auth", authRoutes);

app.use("/api/test", testRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/dashboard", dashboardRoutes);

module.exports = app;