import pool from "../config/db.js";

/*
=================================
Dashboard Analytics
=================================
*/

export const getDashboardData =
  async (req, res) => {
    try {
      /*
      ============================
      Total Tasks
      ============================
      */

      const totalTasksResult =
        await pool.query(
          `
          SELECT COUNT(*) 
          FROM tasks
          `
        );

      /*
      ============================
      Tasks By Status
      ============================
      */

      const todoResult =
        await pool.query(
          `
          SELECT COUNT(*)

          FROM tasks

          WHERE status = 'TODO'
          `
        );

      const inProgressResult =
        await pool.query(
          `
          SELECT COUNT(*)

          FROM tasks

          WHERE status = 'IN_PROGRESS'
          `
        );

      const doneResult =
        await pool.query(
          `
          SELECT COUNT(*)

          FROM tasks

          WHERE status = 'DONE'
          `
        );

      /*
      ============================
      Overdue Tasks
      ============================
      */

      const overdueResult =
        await pool.query(
          `
          SELECT COUNT(*)

          FROM tasks

          WHERE
          due_date < CURRENT_DATE

          AND status != 'DONE'
          `
        );

      /*
      ============================
      Tasks Per User
      ============================
      */

      const tasksPerUser =
        await pool.query(
          `
          SELECT
          users.name,

          COUNT(tasks.id)
          AS total_tasks

          FROM users

          LEFT JOIN tasks

          ON users.id =
          tasks.assigned_to

          GROUP BY users.name

          ORDER BY total_tasks DESC
          `
        );

      /*
      ============================
      Response
      ============================
      */

      res.status(200).json({
        success: true,

        analytics: {
          totalTasks:
            totalTasksResult
              .rows[0].count,

          tasksByStatus: {
            todo:
              todoResult
                .rows[0].count,

            inProgress:
              inProgressResult
                .rows[0].count,

            done:
              doneResult
                .rows[0].count,
          },

          overdueTasks:
            overdueResult
              .rows[0].count,

          tasksPerUser:
            tasksPerUser.rows,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.toString(),
      });
    }
  };