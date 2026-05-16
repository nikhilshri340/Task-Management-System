const Navbar = () => {
  const storedUser =
    localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  return (
    <div className="bg-gray-800 px-6 py-4 rounded-xl flex items-center justify-between mb-8">
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 text-white px-4 py-2 rounded-lg outline-none border border-gray-600 w-72"
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
          {user?.name
            ?.charAt(0)
            ?.toUpperCase() || "U"}
             </div>

        <div>
          <h3 className="font-semibold">
            {user?.name || "User"}
          </h3>

          <p className="text-sm text-gray-400">
            {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;