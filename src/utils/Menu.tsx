import React from "react";
import rutas from "./routeconfig";
import { NavLink } from "react-router-dom";
import { logout } from "../services/user_services";

export default function Menu() {
    return(
        <nav className="relative flex flex-wrap items-center content-between py-3 px-4 text-white bg-gray-900 navbar-fixed-top">
            <div className="container max-w-full mx-auto sm:px-4">
                <div className="hidden flex-grow items-center">
                    <ul className="flex flex-wrap list-reset pl-0 me-auto mb-2 lg:mb-0">
                        {
                            rutas.filter(ruta => ruta.visible).map((ruta, index) => {
                                return(
                                    <li className="nav-item" key={index}>
                                        <NavLink to={ruta.path} className="inline-block py-2 px-4 no-underline">
                                            {ruta.title}
                                        </NavLink>
                                    </li>
                                )
                            })
                        }
                        <li className="nav-item" onClick={() => logout}>
                            Cerrar Sesión
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};
