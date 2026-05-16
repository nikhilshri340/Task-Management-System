import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Tasks = () => {
  const [tasks, setTasks] =
    useState(() => {
      const savedTasks =
        localStorage.getItem(
          "tasks"
        );

      return savedTasks
        ? JSON.parse(savedTasks)
        : [];
    });

  const [formData, setFormData] =
  useState({
    title: "",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
    project: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title) {
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),

      title: formData.title,

      status: formData.status,
    };

    setTasks((prev) => [
      ...prev,
      newTask,
    ]);

    setFormData({
      title: "",
      status: "Pending",
    });
  };

  const handleDelete = (id) => {
    const updatedTasks =
      tasks.filter(
        (task) => task.id !== id
      );

    setTasks(updatedTasks);
  };

  const toggleStatus = (id) => {
    const updatedTasks =
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,

            status:
              task.status ===
              "Completed"
                ? "Pending"
                : "Completed",
          };
        }

        return task;
      });

    setTasks(updatedTasks);
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        <h1 className="text-4xl font-bold">
          Tasks ✅
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your tasks here.
        </p>

        <div className="bg-gray-800 p-6 rounded-xl mt-8">
          <h2 className="text-2xl font-semibold mb-6">
            Create Task
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 outline-none"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 outline-none"
            >
              <option>
                Pending
              </option>

              <option>
                Completed
              </option>
            </select>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
            >
              Create Task
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold">
                {task.title}
              </h2>

              <p
                className={`mt-4 font-semibold ${
                  task.status ===
                  "Completed"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {task.status}
              </p>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() =>
                    toggleStatus(
                      task.id
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  Toggle Status
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      task.id
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;