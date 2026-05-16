import pool from "../config/db.js";

/*
=================================
Get Tasks
=================================
*/

export const getTasks =
  async (req, res) => {
    try {
      const result =
        await pool.query(`
          SELECT
          tasks.*,

          users.name AS assigned_to_name

          FROM tasks

          LEFT JOIN users
          ON tasks.assigned_to = users.id

          ORDER BY tasks.id DESC
        `);

      res.status(200).json({
        success: true,

        tasks: result.rows,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };

/*
=================================
Create Task
=================================
*/

export const createTask =
  async (req, res) => {
    try {
      const {
        title,
        description,
        priority,
        status,
        dueDate,
        projectId,
        assignedTo,
      } = req.body;

      /*
      ============================
      Validation
      ============================
      */

      if (!title) {
        return res.status(400).json({
          success: false,

          message:
            "Task title required",
        });
      }

      /*
      ============================
      Insert
      ============================
      */

      const result =
        await pool.query(
          `
          INSERT INTO tasks
          (
            title,
            description,
            priority,
            status,
            due_date,
            project_id,
            assigned_to
          )

          VALUES
          ($1, $2, $3, $4, $5, $6, $7)

          RETURNING *
          `,
          [
            title,
            description,
            priority,
            status,
            dueDate,
            projectId || null,
            assignedTo || null,
          ]
        );

      res.status(201).json({
        success: true,

        task:
          result.rows[0],
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };

/*
=================================
Update Task
=================================
*/

export const updateTask =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const { status } =
        req.body;

      await pool.query(
        `
        UPDATE tasks
        SET status = $1
        WHERE id = $2
        `,
        [status, id]
      );

      res.status(200).json({
        success: true,

        message:
          "Task updated",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };

/*
=================================
Delete Task
=================================
*/

export const deleteTask =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      await pool.query(
        `
        DELETE FROM tasks
        WHERE id = $1
        `,
        [id]
      );

      res.status(200).json({
        success: true,

        message:
          "Task deleted",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };