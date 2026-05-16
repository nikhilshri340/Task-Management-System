import {
  useEffect,
  useState,
} from "react";

import api from "../api/axios";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

const Members = () => {
  const [users, setUsers] =
    useState([]);

  /*
  ================================
  Fetch Members
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar />

        {/* Heading */}

        <h1 className="text-5xl font-bold">
          Members 👥
        </h1>

        <p className="text-gray-400 mt-3">
          Registered users list
        </p>

        {/* Members List */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-800 p-6 rounded-2xl"
              >
                <h2 className="text-2xl font-bold">
                  {user.name}
                </h2>

                <p className="text-gray-400 mt-3">
                  {user.email}
                </p>
              </div>
            ))
          ) : (
            <p>No members found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Members;