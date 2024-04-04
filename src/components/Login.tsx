import React, { useEffect } from "react";
import { getIdentity, loginUser } from "../services/user_services";
import { loginValidation } from "../validation/user_validation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

export default function Login({ registrar }) {
    const [correo, setCorreo] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (loginValidation(correo, password)) {
            try {
                if ((await loginUser(correo, password)) === true) {
                    navigate("/calendar");
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.message ?? "Error al iniciar sesión",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } else{
            Swal.fire({
                icon: "error",
                title: "Datos incorrectos",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    useEffect(() => {
        const identity = getIdentity();
        if (identity) {
            console.log("Usuario logueado");
        } else {
            console.log("Usuario no logueado");
        }
    }, []);

    return (
        <>
            <h1 className="font-bold md:text-5xl lg:text-2xl text-center mb-1">
                Iniciar Sesión
            </h1>

            <hr className="mb-10" />

            <form className="mb-6" onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="sr-only">Correo:</label>
                    <input
                        type="email"
                        name="username"
                        className="block appearance-none  py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border-gray-200 rounded"
                        placeholder="Ingresar correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="sr-only">Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        className="block appearance-none py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border-gray-200 rounded"
                        placeholder="Ingresar contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <input
                    type="submit"
                    value="Submit"
                    className="bg-blue-600 text-white hover:bg-blue-700 border inline-block align-middle text-center py-3 px-4 rounded-xl leading-tight no-underline whitespace-nowrap text-base w-full"
                />
            </form>

            <p>
                ¿No tienes una cuenta?{" "}
                <button
                    className="text-blue-600"
                    onClick={() => registrar(true)}
                >
                    Regístrate
                </button>
            </p>
        </>
    );
}

interface LoginProps {
    registrar: void;
}
