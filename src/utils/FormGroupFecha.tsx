import { useFormikContext } from "formik";
import React from "react";
import MostrarErrorCampo from './MostrarErrorCampo';

export default function FormGroupFecha(props: formGroupFechaProps) {
    const { values, validateForm, touched, errors } = useFormikContext<any>();
    return (
        <div className="mb-4">
            <label htmlFor={props.campo}>{props.label}</label>
            <input
                type="date"
                className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
                name={props.campo}
                id={props.campo}
                defaultValue={values[props.campo]?.toLocaleDateString("es-MX")}
                onChange={(e) => {
                    const fecha = new Date(e.currentTarget.value + 'T00:00:00');
                    values[props.campo] = fecha;
                    validateForm();
                }}
            />
            {touched[props.campo] && errors[props.campo] ? (
                <MostrarErrorCampo error={errors[props.campo]?.toString()!} />
            ) : null}
        </div>
    );
}

interface formGroupFechaProps {
    campo: string;
    label: string;
}
