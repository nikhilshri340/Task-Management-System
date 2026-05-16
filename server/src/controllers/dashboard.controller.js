import pool from "../config/db.js";

/*
=================================
Get Dashboard Analytics
=================================
*/

export const getDashboardData =
  async (req, res) => {
    try {
      /*
      ============================
      Total Projects
      ============================
      */

      const projectsResult =
        await pool.query(
          "SELECT COUNT(*) FROM projects"
        );

      const totalProjects =
        projectsResult.rows[0]
          .count;

      /*
      ============================
      Total Tasks
      ============================
      */

      const tasksResult =
        await pool.query(
          "SELECT COUNT(*) FROM tasks"
        );

      const totalTasks =
        tasksResult.rows[0].count;

      /*
      ============================
      Completed Tasks
      ============================
      */

      const completedResult =
        await pool.query(
          `
          SELECT COUNT(*) 
          FROM tasks
          WHERE status = 'Completed'
          `
        );

      const completedTasks =
        completedResult.rows[0]
          .count;

      /*
      ============================
      Pending Tasks
      ============================
      */

      const pendingResult =
        await pool.query(
          `
          SELECT COUNT(*)
          FROM tasks
          WHERE status = 'Pending'
          `
        );

      const pendingTasks =
        pendingResult.rows[0]
          .count;

      /*
      ============================
      Response
      ============================
      */

      return res.status(200).json({
        success: true,

        analytics: {
          totalProjects,

          totalTasks,

          completedTasks,

          pendingTasks,
        },
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,

        message:
          error.toString(),
      });
    }
  };