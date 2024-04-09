import React, { useEffect, useState } from "react";
import { getIdentity, loginUser } from "../../services/user_services";
import { loginValidation } from "../../validation/user_validation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import UserForm from "./UserForm";
import { UserLogin } from "../../models/user_model";
import { alertaError } from "../../utils/alertas";

export default function Login({ registrar }) {

    const navigate = useNavigate();

    const onSubmit = async (user) => {
        if (loginValidation(user.email, user.password)) {
            try {
                if ((await loginUser(user.email, user.password)) === true) {
                    navigate("/calendar");
                    window.location.reload();
                }
            } catch (error) {
                alertaError(error.response.data.message ?? "Error al iniciar sesión");
            }
        } else{
            alertaError("Datos incorrectos")
        }
    };

    useEffect(() => {
        const identity = getIdentity();
        if (identity) {
            navigate("/calendar");
                    window.location.reload();
        }
    }, []);

    return (
        <>
            <h1 className="font-bold md:text-5xl lg:text-2xl text-center mb-1">
                Iniciar Sesión
            </h1>

            <hr className="mb-10" />

            <UserForm
                modelo={{
                    email: "",
                    password: "",
                }}
                onSubmit={(valores: UserLogin) => onSubmit(valores)}
            />

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
