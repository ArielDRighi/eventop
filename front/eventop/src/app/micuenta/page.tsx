
import { UserInfo } from "@/views/UserDashboard/UserInfo";
import React from "react";
import Head from "next/head";

const UserDashboard  = () => {
  return (
    <>
      <Head>
        <title>Dashboard de Usuario</title>
        <meta name="description" content="Panel de control de usuario" />
      </Head>
      <UserInfo />
    </>
  );
};
export default UserDashboard
