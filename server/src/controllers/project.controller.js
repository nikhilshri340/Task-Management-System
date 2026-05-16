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
        await pool.query(
          `
          SELECT p.*

          FROM projects p

          INNER JOIN project_members pm

          ON p.id = pm.project_id

          WHERE pm.user_id = $1

          ORDER BY p.created_at DESC
          `,
          [req.user.id]
        );

      res.status(200).json({
        success: true,

        projects:
          result.rows,
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
      Create Project
      ============================
      */

      const result =
        await pool.query(
          `
          INSERT INTO projects
          (
            title,
            description,
            created_by
          )

          VALUES ($1, $2, $3)

          RETURNING *
          `,
          [
            title,
            description,
            req.user.id,
          ]
        );

      /*
      ============================
      Add Creator As Member
      ============================
      */

      await pool.query(
        `
        INSERT INTO project_members
        (
          project_id,
          user_id
        )

        VALUES ($1, $2)
        `,
        [
          result.rows[0].id,
          req.user.id,
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
          error.toString(),
      });
    }
  };

/*
=================================
Update Project
=================================
*/

export const updateProject =
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        title,
        description,
      } = req.body;

      const result =
        await pool.query(
          `
          UPDATE projects

          SET
          title = $1,
          description = $2

          WHERE id = $3

          RETURNING *
          `,
          [
            title,
            description,
            id,
          ]
        );

      res.status(200).json({
        success: true,

        project:
          result.rows[0],
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
Delete Project
=================================
*/

export const deleteProject =
  async (req, res) => {
    try {
      const { id } = req.params;

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
          "Project deleted successfully",
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
Add Member
=================================
*/

export const addMember =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { email } = req.body;

      /*
      ============================
      Find User
      ============================
      */

      const userResult =
        await pool.query(
          `
          SELECT *
          FROM users

          WHERE email = $1
          `,
          [email]
        );

      if (
        userResult.rows.length === 0
      ) {
        return res.status(404).json({
          success: false,

          message:
            "User not found",
        });
      }

      const user =
        userResult.rows[0];

      /*
      ============================
      Check Existing Member
      ============================
      */

      const existingMember =
        await pool.query(
          `
          SELECT *
          FROM project_members

          WHERE
          project_id = $1

          AND user_id = $2
          `,
          [id, user.id]
        );

      if (
        existingMember.rows
          .length > 0
      ) {
        return res.status(400).json({
          success: false,

          message:
            "User already member",
        });
      }

      /*
      ============================
      Add Member
      ============================
      */

      await pool.query(
        `
        INSERT INTO project_members
        (
          project_id,
          user_id
        )

        VALUES ($1, $2)
        `,
        [id, user.id]
      );

      res.status(200).json({
        success: true,

        message:
          "Member added successfully",
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
Remove Member
=================================
*/

export const removeMember =
  async (req, res) => {
    try {
      const {
        projectId,
        userId,
      } = req.params;

      await pool.query(
        `
        DELETE FROM project_members

        WHERE
        project_id = $1

        AND user_id = $2
        `,
        [projectId, userId]
      );

      res.status(200).json({
        success: true,

        message:
          "Member removed successfully",
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