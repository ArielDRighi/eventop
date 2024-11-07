import React from "react";

const UserManagement = () => {
  return (
    <div className="container mt-32 rounded-xl mx-auto p-4 bg-gray-50 dark:bg-gray-800">
      <h1 className="text-3xl font-semibold mb-4">User Management</h1>

      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search by name, email or status"
          className="p-2 border rounded-lg w-1/3"
        />
      </div>

      <div className="mt-8 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
        <h2 className="text-xl font-semibold">Add / Edit User</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Name"
            className="p-2 w-full mb-4 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 w-full mb-4 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 w-full mb-4 border rounded-lg"
          />
          <select className="p-2 w-full mb-4 border rounded-lg text-zinc-600 bg-gray-50 ">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
