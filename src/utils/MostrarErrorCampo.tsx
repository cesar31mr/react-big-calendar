import React from "react";

export default function MostrarErrorCampo(props: mostrarErrorCampoProps) {
    return (
        <div className="text-red-600">
            {props.error}
        </div>
    );
    
};

interface mostrarErrorCampoProps {
    error: string;
}
