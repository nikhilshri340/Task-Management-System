import {
  Link,
  useLocation,
} from "react-router-dom";

const Sidebar = () => {
  /*
  ================================
  Location
  ================================
  */

  const location =
    useLocation();

  /*
  ================================
  Role
  ================================
  */

  const role =
    localStorage
      .getItem("role")
      ?.toLowerCase();

  /*
  ================================
  Menu Items
  ================================
  */

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Projects",
      path: "/projects",
    },

    {
      name: "Tasks",
      path: "/tasks",
    },

    /*
    ============================
    Admin Only Members Page
    ============================
    */

    ...(role === "admin"
      ? [
          {
            name: "Members",
            path: "/members",
          },
        ]
      : []),
  ];

  /*
  ================================
  Logout
  ================================
  */

  const handleLogout = () => {
    localStorage.clear();

    window.location.href =
      "/login";
  };

  return (
    <div className="w-72 bg-gray-800 min-h-screen p-6 flex flex-col justify-between">
      {/* =========================
          TOP SECTION
      ========================== */}

      <div>
        {/* Logo */}

        <h1 className="text-3xl font-bold text-white mb-10">
          Task Manager
        </h1>

        {/* Menu */}

        <div className="space-y-4">
          {menuItems.map(
            (item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-5 py-4 rounded-xl transition ${
                  location.pathname ===
                  item.path
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>

      {/* =========================
          BOTTOM SECTION
      ========================== */}

      <div className="flex justify-start">
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;