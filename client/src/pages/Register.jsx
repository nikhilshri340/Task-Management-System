import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  /*
  ================================
  State
  ================================
  */

  const [formData, setFormData] =
    useState({
      name: "",
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
  Handle Register
  ================================
  */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const response =
        await api.post(
          "/auth/register",
          formData
        );

      /*
      ============================
      Save Auth Data
      ============================
      */

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.user.role
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
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

      alert(
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Heading */}

        <h1 className="text-4xl font-bold text-center">
          Register 🚀
        </h1>

        <p className="text-gray-400 text-center mt-3 mb-8">
          Create your account
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Name */}

          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-700 outline-none"
          />

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

          {/* Button */}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-semibold"
          >
            Register
          </button>
        </form>

        {/* Login Link */}

        <p className="text-center text-gray-400 mt-6">
          Already have an account?
          {" "}

          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;