import {
  useEffect,
  useState,
} from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Projects = () => {
  const [projects, setProjects] =
    useState(() => {
      const savedProjects =
        localStorage.getItem(
          "projects"
        );

      return savedProjects
        ? JSON.parse(savedProjects)
        : [];
    });

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  useEffect(() => {
    localStorage.setItem(
      "projects",
      JSON.stringify(projects)
    );
  }, [projects]);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description
    ) {
      return;
    }

    const newProject = {
      id: crypto.randomUUID(),

      title: formData.title,

      description:
        formData.description,
    };

    setProjects((prev) => [
      ...prev,
      newProject,
    ]);

    setFormData({
      title: "",
      description: "",
    });
  };

  const handleDelete = (id) => {
    const updatedProjects =
      projects.filter(
        (project) =>
          project.id !== id
      );

    setProjects(updatedProjects);
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />
        <h1 className="text-4xl font-bold">
          Projects 📁
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your projects here.
        </p>

        <div className="bg-gray-800 p-6 rounded-xl mt-8">
          <h2 className="text-2xl font-semibold mb-6">
            Create Project
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="title"
              placeholder="Project title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 outline-none"
            />

            <textarea
              name="description"
              placeholder="Project description"
              value={
                formData.description
              }
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 outline-none"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            >
              Create Project
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold">
                {project.title}
              </h2>

              <p className="text-gray-400 mt-3">
                {
                  project.description
                }
              </p>

              <button
                onClick={() =>
                  handleDelete(
                    project.id
                  )
                }
                className="mt-5 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;