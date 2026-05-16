import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

const Projects = () => {
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

  const [projects, setProjects] =
    useState([]);

  const [memberEmail, setMemberEmail] =
    useState("");

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

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

  useEffect(() => {
    fetchProjects();
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
  Create Project
  ================================
  */

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await api.post(
        "/projects",
        formData
      );

      fetchProjects();

      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log(error);

      alert(
        "Failed to create project"
      );
    }
  };

  /*
  ================================
  Delete Project
  ================================
  */

  const handleDelete = async (
    id
  ) => {
    try {
      await api.delete(
        `/projects/${id}`
      );

      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  /*
  ================================
  Add Member
  ================================
  */

  const addMember =
    async (projectId) => {
      try {
        await api.post(
          `/projects/${projectId}/members`,
          {
            email: memberEmail,
          }
        );

        alert(
          "Member added successfully"
        );

        setMemberEmail("");
      } catch (error) {
        console.log(error);

        alert(
          "Failed to add member"
        );
      }
    };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        <h1 className="text-5xl font-bold">
          Projects 📁
        </h1>

        <p className="text-gray-400 mt-3">
          Manage projects and teams
        </p>

        {/* CREATE PROJECT */}

        {role === "admin" && (
          <div className="bg-gray-800 p-6 rounded-2xl mt-8">
            <h2 className="text-2xl font-bold mb-6">
              Create Project
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-4"
            >
              <input
                type="text"
                name="title"
                placeholder="Project title"
                value={
                  formData.title
                }
                onChange={
                  handleChange
                }
                className="w-full p-3 rounded-lg bg-gray-700"
              />

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

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
              >
                Create Project
              </button>
            </form>
          </div>
        )}

        {/* PROJECTS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {projects.length > 0 ? (
            projects.map(
              (project) => (
                <div
                  key={
                    project.id
                  }
                  className="bg-gray-800 p-6 rounded-2xl"
                >
                  <h2 className="text-2xl font-bold">
                    {
                      project.title
                    }
                  </h2>

                  <p className="text-gray-400 mt-3">
                    {
                      project.description
                    }
                  </p>

                  {/* ADMIN CONTROLS */}

                  {role ===
                    "admin" && (
                    <>
                      <button
                        onClick={() =>
                          handleDelete(
                            project.id
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg mt-5"
                      >
                        Delete
                      </button>

                      {/* Add Member */}

                      <div className="mt-6">
                        <input
                          type="email"
                          placeholder="Member email"
                          value={
                            memberEmail
                          }
                          onChange={(
                            e
                          ) =>
                            setMemberEmail(
                              e
                                .target
                                .value
                            )
                          }
                          className="w-full p-3 rounded-lg bg-gray-700"
                        />

                        <button
                          onClick={() =>
                            addMember(
                              project.id
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg mt-3"
                        >
                          Add Member
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )
            )
          ) : (
            <p className="text-gray-400">
              No projects found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;