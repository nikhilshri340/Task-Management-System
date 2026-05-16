const Navbar = () => {
  /*
  ================================
  Get Role
  ================================
  */

  const role =
    localStorage
      .getItem("role")
      ?.toLowerCase();

  /*
  ================================
  Role Text
  ================================
  */

  const roleText =
    role === "admin"
      ? "Admin"
      : "User";

  return (
    <div className="flex justify-between items-center bg-gray-800 p-5 rounded-2xl shadow-lg">
      {/* Left */}

      <div>
        <h1 className="text-2xl font-bold text-white">
          Team Task Manager
        </h1>

        <p className="text-gray-400 text-sm mt-1">
          Welcome back 🚀
        </p>
      </div>

      {/* Right */}

      <div
        className={`px-4 py-2 rounded-xl font-semibold ${
          role === "admin"
            ? "bg-red-600"
            : "bg-blue-600"
        }`}
      >
        {roleText}
      </div>
    </div>
  );
};

export default Navbar;