import React, { useEffect, useState } from "react";
import { getIdentity, loginUser } from "../../services/user_services";
import { loginValidation } from "../../validation/user_validation";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import UserForm from "./UserForm";
import { UserLogin } from "../../models/user_model";

export default function Login({ registrar }) {

    const navigate = useNavigate();

    const onSubmit = async (user) => {
        if (loginValidation(user.email, user.password)) {
            try {
                if ((await loginUser(user.email, user.password)) === true) {
                    //redirect to /calendar
                    navigate("/calendar");
                    window.location.reload();
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
