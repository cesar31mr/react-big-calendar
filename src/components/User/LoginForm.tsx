import { useState } from "react";
import Login from "./Login";
import React from "react";
import SignUp from "./SignUp";

export default function LoginForm() {
    const [registro, setRegistro] = useState(false);

    function Registrar(registrar: boolean) {
        console.log("Registrarse");
        setRegistro(registrar);
    }

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex flex-wrap items-center justify-center">
                    <div className="w-full md:w-2/3 lg:w-5/6 py-8">
                        {registro ? (
                            <SignUp registrar={Registrar} />
                        ) : (
                            <Login registrar={Registrar} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
