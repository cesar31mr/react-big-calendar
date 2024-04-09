import React from "react";
import rutas from "./routeconfig";
import { NavLink, useNavigate } from "react-router-dom";
import { getIdentity, logout } from "../services/user_services";

export default function Menu() {
    const navigate = useNavigate();
    const identity = getIdentity();

    const onClickLogout = () => {
        logout();
        navigate("/");
        window.location.reload();
    }
    return(
        <nav className="relative flex flex-wrap items-center content-between py-3 px-4 text-black bg-slate-400 navbar-fixed-top">
            <div className="container max-w-full mx-auto sm:px-4">
                <div className="flex-grow items-center">
                    <ul className="flex flex-wrap list-reset pl-0 me-auto mb-2 lg:mb-0">
                        { rutas ?
                            rutas.filter(ruta => ruta.visible).map((ruta, index) => {
                                return(
                                    <li className="nav-item" key={index}>
                                        <NavLink to={ruta.path} className="inline-block py-2 px-4 no-underline">
                                            {ruta.title}
                                        </NavLink>
                                    </li>
                                )
                            }) : null
                        }
                        <li className="nav-item text-sm py-0">
                            {/* Botón para cerrar sesión */}
                            <button className="inline-block py-2 px-4 no-underline" onClick={() => onClickLogout()}>
                                {identity.name + " - "} Cierra sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};
