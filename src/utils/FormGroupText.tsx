import { ErrorMessage, Field } from "formik";
import React from "react";

export default function FormGroupText(props: formGroupTextProps) {
    return(
        <div className="mb-4">
            {props.label ? <label className="sr-only">{props.label}</label> : null}
            <Field 
            type={props.type}
            name={props.campo}
            className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 border border-gray-200 rounded"
            placeholder={props.placeholder}
            />
            <ErrorMessage name={props.campo}>
                {mensaje => <div className="text-red-600">{mensaje}</div>}
            </ErrorMessage>
        </div>
    )
};

interface formGroupTextProps {
    campo: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password';
}

FormGroupText.defaultProps = {
    type: 'text'
};
