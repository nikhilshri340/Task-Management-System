import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  /*
  ================================
  State
  ================================
  */

  const [isAdmin, setIsAdmin] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  /*
  ================================
  Handle Change
  ================================
  */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  /*
  ================================
  Handle Login
  ================================
  */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const response =
        await api.post(
          "/auth/login",
          formData
        );

      /*
      ============================
      Backend User
      ============================
      */

      const backendUser =
        response.data.user;

      /*
      ============================
      Admin Validation
      ============================
      */

      if (
        isAdmin &&
        backendUser.role?.toLowerCase() !==
          "admin"
      ) {
        alert(
          "Invalid Admin Credentials"
        );

        return;
      }

      /*
      ============================
      Save Auth
      ============================
      */

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        backendUser.role.toLowerCase()
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          backendUser
        )
      );

      /*
      ============================
      Redirect
      ============================
      */

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Heading */}

        <h1 className="text-4xl font-bold text-center">
          Login 🚀
        </h1>

        <p className="text-gray-400 text-center mt-3 mb-8">
          Access your task manager
        </p>

        {/* =========================
            Role Toggle
        ========================== */}

        <div className="flex gap-4 mb-6">
          {/* User Login */}

          <button
            type="button"
            onClick={() =>
              setIsAdmin(false)
            }
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              !isAdmin
                ? "bg-blue-600"
                : "bg-gray-700"
            }`}
          >
            User Login
          </button>

          {/* Admin Login */}

          <button
            type="button"
            onClick={() =>
              setIsAdmin(true)
            }
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              isAdmin
                ? "bg-red-600"
                : "bg-gray-700"
            }`}
          >
            Admin Login
          </button>
        </div>

        {/* =========================
            Login Form
        ========================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-700 outline-none"
          />

          {/* Password */}

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={
              formData.password
            }
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-700 outline-none"
          />

          {/* Submit */}

          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-semibold transition ${
              isAdmin
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isAdmin
              ? "Admin Login"
              : "User Login"}
          </button>
        </form>

        {/* =========================
            Register Link
        ========================== */}

        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?
          {" "}

          <Link
            to="/register"
            className="text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;