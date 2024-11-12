"use client";

import { getRoleFromToken } from "@/helpers/getRoleFromToken";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);

  useEffect(() => {
    const role = getRoleFromToken();
    if (role) {
      console.log(role);
      if (role === "guest") {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    }
  }, [isAdmin]);


  return (
    <nav className="navbar lg:max-w-6xl mx-auto bg-gray-900 text-white">
      <div className="navbar-start">
        <Link href={"/"} className="text-xl font-bold">
          <span className="text-purple-500">E</span>ven
          <span className="text-purple-500">Top</span>
        </Link>
      </div>
      <div className="navbar-center text-sm hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>
              <button>Inicio</button>
            </Link>
          </li>
          <li>
            <Link href={"/events"}>
              Encuentra Eventos
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <button>Precios</button>
            </Link>
          </li>
          {/* Renderiza la opción de Admin solo si el usuario es admin */}
          {isAdmin && (
            <li>
              <Link href={"/admin"}>
                Admin
              </Link>
            </li>
          )}
          <li>
            <details>
              <summary>Argentina | ES</summary>
              <ul className="p-2">
                <li>
                  <a>Inglés</a>
                </li>
                <li>
                  <a>Italiano</a>
                </li>
                <li>
                  <a>Portugués</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link className="btn bg-purple-500 text-white hover:bg-purple-600" href={"/micuenta"}>
          Mi Cuenta
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;