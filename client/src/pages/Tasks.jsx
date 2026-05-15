import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../api/axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [project, setProject] =
    useState(null);

  const [members, setMembers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "MEDIUM",
      dueDate: "",
      assignedToId: "",
    });

  const projectId =
    localStorage.getItem(
      "selectedProjectId"
    );

  /*
  =================================
  Fetch Project
  =================================
  */

  const fetchProject = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await api.get(
        `/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProject(response.data.project);

      setMembers(
        response.data.project.members
      );
    } catch (error) {
      console.log(error);
    }
  };

  /*
  =================================
  Fetch Tasks
  =================================
  */

  const fetchTasks = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await api.get(
        `/tasks/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchProject();

      fetchTasks();
    }
  }, []);

  /*
  =================================
  Handle Change
  =================================
  */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /*
  =================================
  Create Task
  =================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      await api.post(
        "/tasks",
        {
          ...formData,

          projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Task created successfully"
      );

      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
        assignedToId: "",
      });

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  =================================
  Update Status
  =================================
  */

  const updateStatus = async (
    taskId,
    status
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      await api.patch(
        `/tasks/${taskId}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status updated");

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">
        Tasks
      </h1>

      {!projectId ? (
        <div className="bg-yellow-100 text-yellow-700 p-5 rounded-xl">
          Please select a project first
        </div>
      ) : (
        <>
          {/* Create Task */}

          <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
            <h2 className="text-xl font-semibold mb-5">
              Create Task
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                required
              />

              <textarea
                name="description"
                value={
                  formData.description
                }
                onChange={handleChange}
                placeholder="Task description"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="LOW">
                    LOW
                  </option>

                  <option value="MEDIUM">
                    MEDIUM
                  </option>

                  <option value="HIGH">
                    HIGH
                  </option>
                </select>

                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-3"
                />

                <select
                  name="assignedToId"
                  value={
                    formData.assignedToId
                  }
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-3"
                  required
                >
                  <option value="">
                    Assign User
                  </option>

                  {members.map((member) => (
                    <option
                      key={member.user.id}
                      value={member.user.id}
                    >
                      {member.user.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                {loading
                  ? "Creating..."
                  : "Create Task"}
              </button>
            </form>
          </div>

          {/* Tasks */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold">
                    {task.title}
                  </h2>

                  <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    {task.priority}
                  </span>
                </div>

                <p className="text-gray-600 mb-5">
                  {task.description}
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  <p>
                    Assigned To:{" "}
                    {
                      task.assignedTo.name
                    }
                  </p>

                  <p>
                    Due Date:{" "}
                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      : "No Date"}
                  </p>
                </div>

                <div className="mt-5">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateStatus(
                        task.id,
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="TODO">
                      TODO
                    </option>

                    <option value="IN_PROGRESS">
                      IN PROGRESS
                    </option>

                    <option value="DONE">
                      DONE
                    </option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default Tasks;