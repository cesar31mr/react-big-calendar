import React from "react";
import Swal from "sweetalert2";
import { UserCreation } from "../../models/user_model";
import { validatePassword, validateUser } from "../../validation/user_validation";
import { registrarUsuario } from "../../services/user_services";
import { alertaError, alertaSuccess, alertaWarning } from "../../utils/alertas";

export default function SignUp({ registrar }) {
    const [nombre, setNombre] = React.useState("");
    const [correo, setCorreo] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [enabled, setEnabled] = React.useState(false);
    const [newUser, setNewUser] = React.useState<UserCreation>();

    function confirmPass() {
        if (validatePassword(password, confirmPassword)) {
            setEnabled(true);
        } else {
            setEnabled(false);
            alertaError("Las contraseñas no coinciden");
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setNewUser({
            name: nombre,
            email: correo,
            password: password,
        });

        if (validateUser(newUser!)) {
            try {
                if(await registrarUsuario(newUser!) === true){
                    alertaSuccess("Usuario creado correctamente");    
                    registrar(false);
                }
            } catch (error) {
                alertaError(error.response.data.message ?? "Error al crear usuario")
            }
        } else {
            alertaWarning("Faltan campos por llenar")
        }
    };

    const cancelar = (e) => {
        e.preventDefault();
        limpiarCampos();
        registrar(false);
    };

    function limpiarCampos() {
        setNewUser({} as UserCreation);
        setCorreo("");
        setPassword("");
        setNombre("");
        setConfirmPassword("");
    }

    return (
        <>
            <h1 className="font-bold md:text-5xl lg:text-2xl text-center mb-1">
                Registrarse
            </h1>

            <hr className="mb-10" />

            <form className="mb-6" onSubmit={onSubmit}>
                <div className="mb-4">
                    <label className="sr-only">Nombre:</label>
                    <input
                        type="text"
                        name="username"
                        className="block appearance-none  py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border-gray-200 rounded"
                        placeholder="Ingresar Nombre"
                        maxLength={80}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="sr-only">Correo:</label>
                    <input
                        type="email"
                        name="email"
                        className="block appearance-none  py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border-gray-200 rounded"
                        placeholder="Ingresar correo"
                        maxLength={80}
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        autoComplete="off"
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
                        maxLength={80}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="sr-only">Confirmar contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        className="block appearance-none py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border-gray-200 rounded"
                        placeholder="Confirmar contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={confirmPass}
                        autoComplete="off"
                        required
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <input
                        type="submit"
                        value="Guardar"
                        disabled={!enabled}
                        className="bg-blue-600 text-white hover:bg-blue-700 border inline-block align-middle text-center py-3 px-4 rounded-xl leading-tight no-underline whitespace-nowrap text-base w-full"
                    />

                    <input
                        type="submit"
                        value="Cancelar"
                        onClick={cancelar}
                        className="bg-red-600 text-white hover:bg-red-700 border inline-block align-middle text-center py-3 px-4 rounded-xl leading-tight no-underline whitespace-nowrap text-base w-full"
                    />
                </div>
            </form>
        </>
    );
}

interface RegistrarProps {
    registrar: void;
}
