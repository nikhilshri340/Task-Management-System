import pool from "../config/db.js";

/*
=================================
Get Projects
=================================
*/

export const getProjects =
  async (req, res) => {
    try {
      const result =
        await pool.query(`
          SELECT *
          FROM projects
          ORDER BY id DESC
        `);

      res.status(200).json({
        success: true,

        projects: result.rows,
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
Create Project
=================================
*/

export const createProject =
  async (req, res) => {
    try {
      const {
        title,
        description,
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
            "Project title required",
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
          INSERT INTO projects
          (title, description)

          VALUES
          ($1, $2)

          RETURNING *
          `,
          [
            title,
            description,
          ]
        );

      res.status(201).json({
        success: true,

        project:
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
Delete Project
=================================
*/

export const deleteProject =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      await pool.query(
        `
        DELETE FROM projects
        WHERE id = $1
        `,
        [id]
      );

      res.status(200).json({
        success: true,

        message:
          "Project deleted",
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