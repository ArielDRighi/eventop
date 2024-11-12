"use client";

import React from "react";

export const UserDashboard = () => {
  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/micuenta";
  };
  return (
    <div className="flex flex-col items-center w-full mx-auto gap-4">
      <h1 className="text-3xl text-center">
        Informacion de usuario, proximamente....
      </h1>
      <button
        onClick={handleLogOut}
        className="text-center p-4 bg-gray-950  text-white font-semibold mx-auto rounded-lg "
      >
        Log Out
      </button>
    </div>
  );
};

export default UserDashboard;
