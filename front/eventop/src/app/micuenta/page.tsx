
import { UserInfo } from "@/views/UserDashboard/UserInfo";
import {  withPageAuthRequired } from "@auth0/nextjs-auth0";
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
export default withPageAuthRequired(UserDashboard, {
  returnTo: '/', // Redirige a la página de inicio de sesión si no está autenticado
});
