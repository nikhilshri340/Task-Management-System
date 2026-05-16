import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };
   return (
    <div className="w-64 bg-gray-800 h-screen p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-10">
        Task Manager
      </h1>

      <nav className="flex flex-col gap-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-3 rounded-lg transition-all"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-3 rounded-lg transition-all"
        >
          <FolderKanban size={20} />
          Projects
        </Link>
        <Link
          to="/tasks"
          className="flex items-center gap-3 text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-3 rounded-lg transition-all"
        >
          <CheckSquare size={20} />
          Tasks
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-all"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;