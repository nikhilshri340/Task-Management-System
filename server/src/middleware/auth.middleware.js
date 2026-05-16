import jwt from "jsonwebtoken";

import pool from "../config/db.js";

const protect = async (
  req,
  res,
  next
) => {
  try {
    let token;

    /*
    ============================
    Get Token
    ============================
    */

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(
          " "
        )[1];
    }

    /*
    ============================
    No Token
    ============================
    */

    if (!token) {
      return res.status(401).json({
        success: false,

        message:
          "Not authorized",
      });
    }

    /*
    ============================
    Verify Token
    ============================
    */

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    /*
    ============================
    Find User
    ============================
    */

    const result =
      await pool.query(
        `
        SELECT id, name, email
        FROM users

        WHERE id = $1
        `,
        [decoded.id]
      );

    if (
      result.rows.length === 0
    ) {
      return res.status(401).json({
        success: false,

        message:
          "User not found",
      });
    }

    req.user = result.rows[0];

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,

      message:
        "Not authorized",
    });
  }
};

export default protect;