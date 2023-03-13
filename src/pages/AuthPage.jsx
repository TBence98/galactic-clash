import AuthForm from "../components/AuthForm/AuthForm";
import Footer from "../components/Footer/Footer";

import classes from "./AuthPage.module.css";

const AuthPage = () => {
    return (
        <div className={classes.auth_page}>
            <main>
                <div className={classes.auth_page__wrapper}>
                    <header className={classes.header}>
                        <h1>
                            <div className={classes.header__tag1}>WEBSTAR</div>
                            <div className={classes.header__tag2}>FRONTEND</div>
                        </h1>
                    </header>
                    <AuthForm />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AuthPage;
