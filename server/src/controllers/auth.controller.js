import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import pool from "../config/db.js";

/*
=================================
Generate JWT
=================================
*/

const generateToken = (id) => {
  return jwt.sign(
    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }
  );
};

/*
=================================
Register User
=================================
*/

export const registerUser =
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      /*
      ============================
      Validate Fields
      ============================
      */

      if (
        !name ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          success: false,

          message:
            "All fields are required",
        });
      }

      /*
      ============================
      Check Existing User
      ============================
      */

      const existingUser =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE email = $1
          `,
          [email]
        );

      if (
        existingUser.rows.length > 0
      ) {
        return res.status(400).json({
          success: false,

          message:
            "User already exists",
        });
      }

      /*
      ============================
      Hash Password
      ============================
      */

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      /*
      ============================
      Create User
      Default Role = member
      ============================
      */

      const result =
        await pool.query(
          `
          INSERT INTO users
          (name, email, password, role)

          VALUES
          ($1, $2, $3, $4)

          RETURNING
          id,
          name,
          email,
          role
          `,
          [
            name,
            email,
            hashedPassword,
            "member",
          ]
        );

      /*
      ============================
      Generate Token
      ============================
      */

      const token =
        generateToken(
          result.rows[0].id
        );

      /*
      ============================
      Response
      ============================
      */

      return res.status(201).json({
        success: true,

        message:
          "User registered successfully",

        token,

        user: result.rows[0],
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };

/*
=================================
Login User
=================================
*/

export const loginUser =
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      /*
      ============================
      Validate Fields
      ============================
      */

      if (
        !email ||
        !password
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Email and password required",
        });
      }

      /*
      ============================
      Find User
      ============================
      */

      const result =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE email = $1
          `,
          [email]
        );

      /*
      ============================
      User Not Found
      ============================
      */

      if (
        result.rows.length === 0
      ) {
        return res.status(401).json({
          success: false,

          message:
            "Invalid credentials",
        });
      }

      const user =
        result.rows[0];

      /*
      ============================
      Compare Password
      ============================
      */

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(401).json({
          success: false,

          message:
            "Invalid credentials",
        });
      }

      /*
      ============================
      Generate Token
      ============================
      */

      const token =
        generateToken(user.id);

      /*
      ============================
      Response
      ============================
      */

      return res.status(200).json({
        success: true,

        message:
          "Login successful",

        token,

        user: {
          id: user.id,

          name: user.name,

          email: user.email,

          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };