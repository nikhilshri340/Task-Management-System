import { Link, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import { useState } from "react";

import useAuthStore from "../store/authStore";

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const logout = useAuthStore(
    (state) => state.logout
  );

  const user = useAuthStore(
    (state) => state.user
  );

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}

      <div
        className={`fixed md:static top-0 left-0 h-full bg-white shadow-lg z-50 w-64 p-5 transition-all ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h1 className="text-2xl font-bold text-blue-600 mb-10">
          Task Manager
        </h1>

        <nav className="space-y-5">
          <Link
            to="/"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium"
          >
            <FaHome />

            Dashboard
          </Link>

          <Link
            to="/projects"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium"
          >
            <FaProjectDiagram />

            Projects
          </Link>

          <Link
            to="/tasks"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium"
          >
            <FaTasks />

            Tasks
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500 hover:text-red-600 font-medium"
          >
            <FaSignOutAlt />

            Logout
          </button>
        </nav>
      </div>

      {/* Main */}

      <div className="flex-1">
        {/* Top Navbar */}

        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button
            onClick={() =>
              setSidebarOpen(
                !sidebarOpen
              )
            }
            className="md:hidden text-2xl"
          >
            <FaBars />
          </button>

          <div>
            <h2 className="text-xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="text-sm text-gray-500">
              Manage your tasks efficiently
            </p>
          </div>

          {/* User */}

          <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
            {user?.name || "User"}
          </div>
        </div>

        {/* Content */}

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;