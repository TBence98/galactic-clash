import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./AuthForm.module.css";

import PrimaryButton from "../UI/PrimaryButton/PrimaryButton";
import AuthContext from "../../store/auth-context";

const AuthForm = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    function submitHandler(event) {
        event.preventDefault();

        const userName = event.target.elements[0].value;
        const password = event.target.elements[1].value;

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
            } else {
                console.log(responseData);
                authCtx.login(responseData);
                navigate("/select-character");
            }
        })();
    }

    return (
        <form onSubmit={submitHandler}>
            <div className={classes.form_group}>
                <label htmlFor="user-name">Felhasználónév</label>
                <input type="text" id="user-name" />
            </div>
            <div className={classes.form_group}>
                <label htmlFor="password">Jelszó</label>
                <input type="password" id="password" />
            </div>
            <PrimaryButton type="submit">Belépés</PrimaryButton>
        </form>
    );
};

export default AuthForm;
