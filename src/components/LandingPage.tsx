import React, { useEffect } from "react";
import ErrorBoundary from "../ErrorBoundary";
import Menu from "../utils/Menu";
import rutas from "../utils/routeconfig";
import { Route, Routes, useNavigate } from "react-router";

export default function LandingPage() {
    const [token, setToken] = React.useState<string | null>();
    const navigate = useNavigate();

    useEffect(() => {
        const tmp = localStorage.getItem("token");
        setToken(tmp);
    }, []);

    return (
        <div>
            <ErrorBoundary>
                {token ? <Menu /> : <></>}
            </ErrorBoundary>
            <div className="items-center justify-center flex flex-wrap p-3">
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
        </div>
    );
}
