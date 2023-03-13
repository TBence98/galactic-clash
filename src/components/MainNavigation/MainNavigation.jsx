import { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

import AuthContext from "../../store/auth-context";
import CharactersContext from "../../store/characters-context";

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const characterCtx = useContext(CharactersContext);
    const name = authCtx.user.lastName + " " + authCtx.user.firstName;

    function logOutHandler() {
        authCtx.logOut();
        characterCtx.clear();
    }

    return (
        <header className={classes.main_navigation}>
            <div className={classes.main_navigation__user}>
                <span>{name}</span>
            </div>
            <nav>
                <div className={classes.main_navigation__leave}>
                    <Link to="/auth" onClick={logOutHandler}>
                        Űrhajó elhagyása
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default MainNavigation;
