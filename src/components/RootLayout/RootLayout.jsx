import { Outlet } from "react-router-dom";

import classes from "./RootLayout.module.css";

import MainNavigation from "../MainNavigation/MainNavigation";
import Footer from "../Footer/Footer";

const RootLayout = () => {
    return (
        <div className={classes.main_layout}>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;
