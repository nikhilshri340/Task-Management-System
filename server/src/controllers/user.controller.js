import pool from "../config/db.js";

export const getUsers =
  async (req, res) => {
    try {
      const result =
        await pool.query(
          `
          SELECT id, name, email
          FROM users
          `
        );

      res.status(200).json({
        success: true,

        users: result.rows,
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