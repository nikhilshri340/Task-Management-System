import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../api/axios";

function Dashboard() {
  const [analytics, setAnalytics] =
    useState(null);

  /*
  =================================
  Fetch Dashboard Data
  =================================
  */

  const fetchDashboard = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalytics(response.data.analytics);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      {!analytics ? (
        <div className="flex items-center justify-center h-64">
         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
         </div>
      ) : (
        <>
          {/* Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-gray-500">
                Total Tasks
              </h2>

              <p className="text-3xl font-bold mt-2">
                {analytics.totalTasks}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6">
              <h2 className="text-gray-500">
                TODO Tasks
              </h2>

              <p className="text-3xl font-bold mt-2">
                {
                  analytics.tasksByStatus
                    .todo
                }
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6">
              <h2 className="text-gray-500">
                In Progress
              </h2>

              <p className="text-3xl font-bold mt-2">
                {
                  analytics.tasksByStatus
                    .inProgress
                }
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6">
              <h2 className="text-gray-500">
                Completed
              </h2>

              <p className="text-3xl font-bold mt-2">
                {
                  analytics.tasksByStatus
                    .completed
                }
              </p>
            </div>
          </div>

          {/* Overdue */}

            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6">
            <h2 className="text-xl font-semibold mb-4">
              Overdue Tasks
            </h2>

            <p className="text-4xl font-bold text-red-500">
              {analytics.overdueTasks}
            </p>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Dashboard;