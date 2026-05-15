import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../api/axios";

function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  /*
  =================================
  Fetch Projects
  =================================
  */

  const fetchProjects = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
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
  Create Project
  =================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      await api.post(
        "/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Project created successfully"
      );

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          Projects
        </h1>
      </div>

      {/* Create Project Form */}

      <div className="bg-white rounded-2xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold mb-5">
          Create New Project
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
            placeholder="Project title"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project description"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {loading
              ? "Creating..."
              : "Create Project"}
          </button>
        </form>
      </div>

      {/* Projects List */}

      {projects.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            No Projects Yet
          </h2>

          <p className="text-gray-500">
            Create your first project to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() =>
                navigate(
                  `/projects/${project.id}`
                )
              }
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer"
            >
              <h2 className="text-xl font-bold mb-3">
                {project.title}
              </h2>

              <p className="text-gray-600 mb-5">
                {project.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  Members:{" "}
                  {project.members.length}
                </span>

                <span>
                  Tasks:{" "}
                  {project.tasks.length}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();

                  localStorage.setItem(
                    "selectedProjectId",
                    project.id
                  );
                }}
                className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
              >
                Select Project
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Projects;