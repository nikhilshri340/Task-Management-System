import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [analytics, setAnalytics] =
    useState(null);

  /*
  ================================
  Fetch Dashboard
  ================================
  */

  const fetchDashboard =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await api.get(
            "/dashboard",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        console.log(response.data);

        console.log(response.data);

          setAnalytics(
           response.data.analytics ||
           response.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  /*
  ================================
  Loading
  ================================
  */

  if (!analytics) {
    return (
      <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center text-3xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        <h1 className="text-5xl font-bold">
          Dashboard 🚀
        </h1>

        <p className="text-gray-400 mt-3">
          Welcome back!
        </p>

        {/* Analytics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {/* Total Tasks */}

          <div className="bg-gray-800 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold">
              Total Tasks
            </h2>

            <p className="text-5xl mt-4 font-bold text-blue-400">
              {analytics.totalTasks || 0}
            </p>
          </div>

          {/* TODO */}

          <div className="bg-gray-800 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold">
              TODO
            </h2>

            <p className="text-5xl mt-4 font-bold text-yellow-400">
              {analytics.tasksByStatus
                ?.todo || 0}
            </p>
          </div>

          {/* IN PROGRESS */}

          <div className="bg-gray-800 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold">
              In Progress
            </h2>

            <p className="text-5xl mt-4 font-bold text-purple-400">
              {analytics.tasksByStatus
                ?.inProgress || 0}
            </p>
          </div>

          {/* DONE */}

          <div className="bg-gray-800 p-6 rounded-2xl">
            <h2 className="text-xl font-semibold">
              Completed
            </h2>

            <p className="text-5xl mt-4 font-bold text-green-400">
              {analytics.tasksByStatus
                ?.done || 0}
            </p>
          </div>
        </div>

        {/* Overdue */}

        <div className="bg-red-500 p-6 rounded-2xl mt-10">
          <h2 className="text-2xl font-bold">
            Overdue Tasks
          </h2>

          <p className="text-5xl mt-4 font-bold">
            {analytics.overdueTasks || 0}
          </p>
        </div>

        {/* Tasks Per User */}

        <div className="bg-gray-800 p-6 rounded-2xl mt-10">
          <h2 className="text-3xl font-bold mb-6">
            Tasks Per User
          </h2>

          <div className="space-y-4">
            {analytics.tasksPerUser
              ?.length > 0 ? (
              analytics.tasksPerUser.map(
                (
                  user,
                  index
                ) => (
                  <div
                    key={index}
                    className="flex justify-between bg-gray-700 p-4 rounded-xl"
                  >
                    <span className="font-semibold">
                      {user.name}
                    </span>

                    <span className="text-blue-400 font-bold">
                      {
                        user.total_tasks
                      }{" "}
                      Tasks
                    </span>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-400">
                No task data yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;