import pool from "../config/db.js";

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
        dueDate,
        status,
      } = req.body;

      if (!title) {
        return res.status(400).json({
          success: false,
          message:
            "Title is required",
        });
      }

      const result =
        await pool.query(
          `
        INSERT INTO tasks
        (
          title,
          description,
          priority,
          due_date,
          status
        )

        VALUES ($1, $2, $3, $4, $5)

        RETURNING *
        `,
          [
            title,
            description,
            priority || "Medium",
            dueDate || null,
            status || "Pending",
          ]
        );

      return res.status(201).json({
        success: true,

        message:
          "Task created successfully",

        task: result.rows[0],
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

/*
=================================
Get All Tasks
=================================
*/

export const getTasks =
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
        SELECT *
        FROM tasks

        ORDER BY created_at DESC
        `
        );

      return res.status(200).json({
        success: true,

        tasks: result.rows,
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

/*
=================================
Update Task Status
=================================
*/

export const updateTaskStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { status } = req.body;

      const result =
        await pool.query(
          `
        UPDATE tasks

        SET status = $1

        WHERE id = $2

        RETURNING *
        `,
          [status, id]
        );

      return res.status(200).json({
        success: true,

        message:
          "Task updated successfully",

        task: result.rows[0],
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

/*
=================================
Delete Task
=================================
*/

export const deleteTask =
  async (req, res) => {
    try {
      const { id } = req.params;

      await pool.query(
        `
        DELETE FROM tasks

        WHERE id = $1
        `,
        [id]
      );

      return res.status(200).json({
        success: true,

        message:
          "Task deleted successfully",
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,

        message:
          error.toString(),
      });
    }
  };import pool from "../config/db.js";

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
        dueDate,
        status,
        assignedTo,
        projectId,
      } = req.body;

      const result =
        await pool.query(
          `
          INSERT INTO tasks
          (
            title,
            description,
            priority,
            due_date,
            status,
            assigned_to,
            project_id
          )

          VALUES
          ($1, $2, $3, $4, $5, $6, $7)

          RETURNING *
          `,
          [
            title,
            description,
            priority ||
              "Medium",

            dueDate || null,

            status || "TODO",

            assignedTo,

            projectId,
          ]
        );

      res.status(201).json({
        success: true,

        task: result.rows[0],
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

/*
=================================
Get All Tasks
=================================
*/

export const getTasks =
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          SELECT t.*

          FROM tasks t

          INNER JOIN
          project_members pm

          ON
          t.project_id =
          pm.project_id

          WHERE
          pm.user_id = $1

          ORDER BY
          t.created_at DESC
          `,
          [req.user.id]
        );

      res.status(200).json({
        success: true,

        tasks: result.rows,
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

/*
=================================
Update Task Status
=================================
*/

export const updateTaskStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { status } = req.body;

      /*
      ============================
      Find Task
      ============================
      */

      const taskResult =
        await pool.query(
          `
          SELECT *
          FROM tasks

          WHERE id = $1
          `,
          [id]
        );

      if (
        taskResult.rows.length === 0
      ) {
        return res.status(404).json({
          success: false,

          message:
            "Task not found",
        });
      }

      const task =
        taskResult.rows[0];

      /*
      ============================
      Permission Check
      ============================
      */

      if (
        req.user.role !==
          "Admin" &&
        task.assigned_to !==
          req.user.id
      ) {
        return res.status(403).json({
          success: false,

          message:
            "Access denied",
        });
      }

      /*
      ============================
      Update Task
      ============================
      */

      const result =
        await pool.query(
          `
          UPDATE tasks

          SET status = $1

          WHERE id = $2

          RETURNING *
          `,
          [status, id]
        );

      res.status(200).json({
        success: true,

        task: result.rows[0],
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

/*
=================================
Delete Task
=================================
*/

export const deleteTask =
  async (req, res) => {
    try {
      const { id } = req.params;

      await pool.query(
        `
        DELETE FROM tasks

        WHERE id = $1
        `,
        [id]
      );

      return res.status(200).json({
        success: true,

        message:
          "Task deleted successfully",
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