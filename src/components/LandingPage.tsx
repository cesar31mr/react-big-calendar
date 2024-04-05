import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import Menu from "../utils/Menu";
import rutas from "../utils/routeconfig";
import { Route, Routes } from "react-router";

export default function LandingPage() {
    return (
        <div>
            <ErrorBoundary>
                <Menu />
            </ErrorBoundary>
            <Routes>
                {rutas.map((ruta, index) => {
                    return (
                        <Route
                            key={index}
                            path={ruta.path}
                            element={<ruta.component />}
                        />
                    );
                })}
            </Routes>
        </div>
    );
}
