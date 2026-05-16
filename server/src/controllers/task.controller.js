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
  };