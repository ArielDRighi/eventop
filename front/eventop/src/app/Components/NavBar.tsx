import Link from "next/link";
import React from "react";

const NavBarUsers = () => {
  return (
    <div className="navbar bg-gray-900 ">
      <div className="navbar-start">
        <Link href={"/"} className="text-xl font-bold">
          <span className="text-purple-500">E</span>ven
          <span className="text-purple-500">Top</span>
        </Link>
      </div>
      <div className="navbar-center text-sm hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"#"}>
              <button>Eventos</button>
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <button>Precios</button>
            </Link>
          </li>
          <li>
            <details>
              <summary>Argentina | ES</summary>
              <ul className="p-2">
                <li>
                  <a>Ingles</a>
                </li>
                <li>
                  <a>Italiano</a>
                </li>
                <li>
                  <a>Portugues</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* <button className="btn bg-purple-500 text-white mx-3">
          <Link href={"../views/Register"}>Registrarse</Link> 
        </button> */}
        <button  className="btn bg-purple-500 text-white"> <Link href={"/micuenta"}>Iniciar</Link></button>
      </div>
    </div>
  );
};

export default NavBarUsers;
