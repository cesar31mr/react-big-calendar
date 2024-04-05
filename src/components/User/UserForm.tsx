import { Form, Formik, FormikHelpers } from "formik";
import { UserLogin } from "../../models/user_model";
import * as Yup from "yup";
import React from "react";
import FormGroupText from "../../utils/FormGroupText";
import Button from "../../utils/Button";

export default function UserForm(props: userFormProps) {
    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email("Correo no válido")
                    .required("Campo obligatorio"),
                password: Yup.string().required("Campo obligatorio"),
            })}
        >
            {(formikProps) => (
                <Form>
                    <FormGroupText campo="email" label="Correo:" placeholder="Correo" />
                    <FormGroupText campo="password" label="Contraseña:" placeholder="Contraseña" type="password" />
                    <Button type="submit" disabled={formikProps.isSubmitting}>
                        Iniciar Sesión
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

interface userFormProps {
    modelo: any;
    onSubmit(valores: UserLogin, acciones: FormikHelpers<UserLogin>): void;
}
