import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
const Dashboard = () => {
  const storedUser =
    localStorage.getItem("user");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  const projects =
    JSON.parse(
      localStorage.getItem(
        "projects"
      )
    ) || [];

  const tasks =
    JSON.parse(
      localStorage.getItem(
        "tasks"
      )
    ) || [];

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "Completed"
    );

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "Pending"
    );

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />
        
        <h1 className="text-4xl font-bold">
          Dashboard 🚀
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome back,{" "}
          <span className="text-blue-400">
            {user?.name || "User"}
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold">
              Total Projects
            </h2>

            <p className="text-5xl mt-4 font-bold text-blue-400">
              {projects.length}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold">
              Total Tasks
            </h2>

            <p className="text-5xl mt-4 font-bold text-green-400">
              {tasks.length}
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold">
              Completed
            </h2>

            <p className="text-5xl mt-4 font-bold text-yellow-400">
              {
                completedTasks.length
              }
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold">
              Pending
            </h2>

            <p className="text-5xl mt-4 font-bold text-red-400">
              {pendingTasks.length}
            </p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl mt-10">
          <h2 className="text-2xl font-bold mb-4">
            Recent Tasks
          </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-400">
              No tasks available.
            </p>
          ) : (
            <div className="space-y-4">
              {tasks
                .slice(-5)
                .reverse()
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-700 p-4 rounded-lg flex items-center justify-between"
                  >
                    <h3 className="font-semibold">
                      {task.title}
                    </h3>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.status ===
                        "Completed"
                          ? "bg-green-600"
                          : "bg-yellow-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;