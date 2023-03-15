import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import classes from "./AuthForm.module.css";

import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";

const AuthForm = ({ submitHandler }) => {
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Email cím szükséges")
            .email("Érvénytelen email"),
        password: Yup.string().required("Jelszó szükséges"),
    });

    function onSubmit(values, actions) {
        submitHandler(values);
        actions.setSubmitting(false);
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit}>
                    <div className={classes.form_group}>
                        <label htmlFor="user-name">Felhasználónév</label>
                        <Field name="email" id="user-name" />
                        <ErrorMessage
                            className={classes.form_group__error_text}
                            name="email"
                            component="span"
                        />
                    </div>
                    <div className={classes.form_group}>
                        <label htmlFor="password">Jelszó</label>
                        <Field name="password" id="password" type="password" />
                        <ErrorMessage
                            className={classes.form_group__error_text}
                            name="password"
                            component="span"
                        />
                    </div>
                    <PrimaryButton type="submit" disabled={isSubmitting}>
                        Belépés
                    </PrimaryButton>
                </Form>
            )}
        </Formik>
    );
};

export default AuthForm;
