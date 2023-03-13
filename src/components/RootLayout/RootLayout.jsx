import { Outlet } from "react-router-dom";

import classes from "./RootLayout.module.css";

import MainNavigation from "../MainNavigation/MainNavigation";
import Footer from "../Footer/Footer";

const RootLayout = () => {
    return (
        <div className={classes.main_layout}>
            <div className={classes.main_layout__main_conent}>
                <MainNavigation />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default RootLayout;
