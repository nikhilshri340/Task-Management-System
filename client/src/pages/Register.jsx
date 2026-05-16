const Register = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-5xl font-bold">
        Dashboard 🚀
      </h1>

      <p className="mt-4 text-xl">
        Welcome{" "}
        <span className="text-blue-400">
          {user?.name}
        </span>
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold">
            Total Projects
          </h2>

          <p className="text-4xl mt-4">
            0
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold">
            Total Tasks
          </h2>

          <p className="text-4xl mt-4">
            0
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold">
            Completed Tasks
          </h2>

          <p className="text-4xl mt-4">
            0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;