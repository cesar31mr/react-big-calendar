import { Form, Formik, FormikHelpers } from "formik";
import { DateEntity } from "../../models/date_model";
import * as Yup from "yup";
import FormGroupText from "../../utils/FormGroupText";
import React from "react";
import FormGroupFecha from "../../utils/FormGroupFecha";
import Button from "../../utils/Button";

export default function EventoForm(props: eventoFormProps) {
    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                title: Yup.string().required("Campo obligatorio"),
                start: Yup.date().required("Campo obligatorio"),
                end: Yup.date().required("Campo obligatorio"),
            })}
        >
            {(formikProps) => (
                <Form>
                    <FormGroupText
                        campo="title"
                        label="Título:"
                        placeholder="Título"
                    />
                    <FormGroupFecha campo="start" label="Inicio:" />
                    <FormGroupFecha campo="end" label="Fin:" />
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <Button
                            type="submit"
                            disabled={formikProps.isSubmitting}
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                            Guardar
                        </Button>
                        <Button
                            type="button"
                            onClick={props.onCancelar}
                            disabled={formikProps.isSubmitting}
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        >
                            Cancelar
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

interface eventoFormProps {
    modelo: any;
    onSubmit(valores: DateEntity, acciones: FormikHelpers<DateEntity>): void;
    onCancelar(): void;
}
