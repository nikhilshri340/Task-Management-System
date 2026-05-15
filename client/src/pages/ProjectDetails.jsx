import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../api/axios";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

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
        `/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProject(response.data.project);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  /*
  =================================
  Add Member
  =================================
  */

  const addMember = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      await api.post(
        `/projects/${id}/members`,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Member added successfully"
      );

      setEmail("");

      fetchProject();
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
      {!project ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Project Header */}

          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h1 className="text-3xl font-bold mb-3">
              {project.title}
            </h1>

            <p className="text-gray-600">
              {project.description}
            </p>
          </div>

          {/* Add Member */}

          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-5">
              Add Team Member
            </h2>

            <form
              onSubmit={addMember}
              className="flex gap-4"
            >
              <input
                type="email"
                placeholder="Enter member email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
              >
                {loading
                  ? "Adding..."
                  : "Add"}
              </button>
            </form>
          </div>

          {/* Members */}

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-5">
              Team Members
            </h2>

            <div className="space-y-4">
              {project.members.map(
                (member) => (
                  <div
                    key={
                      member.user.id
                    }
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {
                          member.user
                            .name
                        }
                      </h3>

                      <p className="text-sm text-gray-500">
                        {
                          member.user
                            .email
                        }
                      </p>
                    </div>

                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {project.adminId ===
                      member.user.id
                        ? "ADMIN"
                        : "MEMBER"}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default ProjectDetails;