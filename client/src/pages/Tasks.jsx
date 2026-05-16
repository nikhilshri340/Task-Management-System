import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

const Tasks = () => {
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
  States
  ================================
  */

  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "Medium",
      status: "TODO",
      dueDate: "",
      projectId: "",
      assignedTo: "",
    });

  /*
  ================================
  Fetch Tasks
  ================================
  */

  const fetchTasks =
    async () => {
      try {
        const response =
          await api.get(
            "/tasks"
          );

        setTasks(
          response.data.tasks ||
            []
        );
      } catch (error) {
        console.log(error);
      }
    };

  /*
  ================================
  Fetch Projects
  ================================
  */

  const fetchProjects =
    async () => {
      try {
        const response =
          await api.get(
            "/projects"
          );

        setProjects(
          response.data.projects ||
            []
        );
      } catch (error) {
        console.log(error);
      }
    };

  /*
  ================================
  Fetch Users
  ================================
  */

  const fetchUsers =
    async () => {
      try {
        const response =
          await api.get(
            "/users"
          );

        setUsers(
          response.data.users ||
            []
        );
      } catch (error) {
        console.log(error);
      }
    };

  /*
  ================================
  useEffect
  ================================
  */

  useEffect(() => {
    fetchTasks();

    fetchProjects();

    /*
    ============================
    Admin Only
    ============================
    */

    if (role === "admin") {
      fetchUsers();
    }
  }, []);

  /*
  ================================
  Handle Change
  ================================
  */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  /*
  ================================
  Create Task
  ================================
  */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await api.post(
        "/tasks",
        formData
      );

      /*
      ============================
      Refresh
      ============================
      */

      fetchTasks();

      /*
      ============================
      Reset Form
      ============================
      */

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "TODO",
        dueDate: "",
        projectId: "",
        assignedTo: "",
      });

      alert(
        "Task created successfully"
      );
    } catch (error) {
      console.log(error);

      alert(
        "Failed to create task"
      );
    }
  };

  /*
  ================================
  Update Status
  ================================
  */

  const updateStatus =
    async (id, status) => {
      try {
        await api.put(
          `/tasks/${id}`,
          {
            status,
          }
        );

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  /*
  ================================
  Delete Task
  ================================
  */

  const deleteTask =
    async (id) => {
      try {
        await api.delete(
          `/tasks/${id}`
        );

        fetchTasks();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        {/* Heading */}

        <h1 className="text-5xl font-bold">
          Tasks 📋
        </h1>

        <p className="text-gray-400 mt-3">
          Manage tasks and assignments
        </p>

        {/* =========================
            ADMIN CREATE TASK
        ========================== */}

        {role === "admin" && (
          <div className="bg-gray-800 p-6 rounded-2xl mt-8">
            <h2 className="text-2xl font-bold mb-6">
              Create & Assign Task
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-4"
            >
              {/* Title */}

              <input
                type="text"
                name="title"
                placeholder="Task title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                className="w-full p-3 rounded-lg bg-gray-700"
              />

              {/* Description */}

              <textarea
                name="description"
                placeholder="Description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                className="w-full p-3 rounded-lg bg-gray-700"
              />

              {/* Due Date */}

              <input
                type="date"
                name="dueDate"
                value={
                  formData.dueDate
                }
                onChange={
                  handleChange
                }
                className="w-full p-3 rounded-lg bg-gray-700"
              />

              {/* Priority */}

              <select
                name="priority"
                value={
                  formData.priority
                }
                onChange={
                  handleChange
                }
                className="w-full p-3 rounded-lg bg-gray-700"
              >
                <option>
                  Low
                </option>

                <option>
                  Medium
                </option>

                <option>
                  High
                </option>
              </select>

              {/* Project */}

              <select
                name="projectId"
                value={
                  formData.projectId
                }
                onChange={
                  handleChange
                }
                className="w-full p-3 rounded-lg bg-gray-700"
              >
                <option value="">
                  Select Project
                </option>

                {projects.map(
                  (project) => (
                    <option
                      key={
                        project.id
                      }
                      value={
                        project.id
                      }
                    >
                      {
                        project.title
                      }
                    </option>
                  )
                )}
              </select>

              {/* Assign User */}

              <select
                name="assignedTo"
                value={
                  formData.assignedTo
                }
                onChange={
                  handleChange
                }
                className="w-full p-3 rounded-lg bg-gray-700"
              >
                <option value="">
                  Assign Member
                </option>

                {users.map(
                  (user) => (
                    <option
                      key={user.id}
                      value={
                        user.id
                      }
                    >
                      {user.name}
                    </option>
                  )
                )}
              </select>

              {/* Button */}

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
              >
                Create Task
              </button>
            </form>
          </div>
        )}

        {/* =========================
            TASKS GRID
        ========================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-800 p-6 rounded-2xl"
              >
                {/* Title */}

                <h2 className="text-2xl font-bold">
                  {task.title}
                </h2>

                {/* Description */}

                <p className="text-gray-400 mt-3">
                  {
                    task.description
                  }
                </p>

                {/* Priority */}

                <div className="mt-4">
                  <span className="bg-purple-600 px-3 py-1 rounded-full text-sm">
                    {
                      task.priority
                    }
                  </span>
                </div>

                {/* Due Date */}

                <p className="mt-4 text-sm text-gray-400">
                  Due:
                  {" "}
                  {task.due_date}
                </p>

                {/* Status */}

                <div className="mt-5">
                  <select
                    value={
                      task.status
                    }
                    onChange={(
                      e
                    ) =>
                      updateStatus(
                        task.id,
                        e.target
                          .value
                      )
                    }
                    className="bg-gray-700 p-2 rounded-lg"
                  >
                    <option value="TODO">
                      TODO
                    </option>

                    <option value="IN_PROGRESS">
                      IN
                      PROGRESS
                    </option>

                    <option value="DONE">
                      DONE
                    </option>
                  </select>
                </div>

                {/* Assigned User */}

                {task.assigned_to_name && (
                  <p className="mt-4 text-sm text-blue-400">
                    Assigned To:
                    {" "}
                    {
                      task.assigned_to_name
                    }
                  </p>
                )}

                {/* Delete */}

                {role ===
                  "admin" && (
                  <button
                    onClick={() =>
                      deleteTask(
                        task.id
                      )
                    }
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg mt-5"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400">
              No tasks found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;