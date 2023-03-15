import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm/AuthForm";
import Footer from "../components/Footer/Footer";
import AuthContext from "../store/auth-context";
import Modal from "../components/UI/PrimaryButton/Modal";

import classes from "./AuthPage.module.css";

const AuthPage = () => {
    const [errorText, setErrorText] = useState("");
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    function submitHandler(values) {
        const userName = values.email;
        const password = values.password;

        (async () => {
            const response = await fetch(
                "https://developer.webstar.hu/rest/frontend-felveteli/v2/authentication/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Applicant-Id": "45PdMect",
                    },
                    body: JSON.stringify({
                        username: userName,
                        password: password,
                    }),
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                console.log(responseData.error);
                setErrorText(responseData.error);
            } else {
                console.log(responseData);
                authCtx.login(responseData);
                navigate("/select-character");
            }
        })();
    }

    function closeModal() {
        setErrorText("");
    }

    return (
        <div className={classes.auth_page}>
            {errorText ? (
                <Modal onClose={closeModal} message={errorText} />
            ) : null}
            <main>
                <div className={classes.auth_page__wrapper}>
                    <header className={classes.header}>
                        <h1>
                            <div className={classes.header__tag1}>WEBSTAR</div>
                            <div className={classes.header__tag2}>FRONTEND</div>
                        </h1>
                    </header>
                    <AuthForm submitHandler={submitHandler} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AuthPage;
