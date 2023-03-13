import React, { useState } from "react";

const AuthContext = React.createContext({
    token: null,
    refreshToken: null,
    user: {
        email: "",
        firstName: "",
        lastName: "",
    },
    isLoggedIn: false,
    login: (loginDatas) => {},
    logOut: () => {},
});

function retrieveUserData() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
        return null;
    }

    return userData;
}

export const AuthContextProvider = (props) => {
    const initialUserData = retrieveUserData();

    const [userData, setUserData] = useState(initialUserData);
    const isLoggedIn = !!userData;

    function login(userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
        setUserData(userData);
    }

    function logOut() {
        localStorage.removeItem("userData");
        setUserData(null);
    }

    const authData = {
        token: userData ? userData.token : null,
        refreshToken: userData ? userData.refreshToken : null,
        user: userData ? userData.user : null,
        isLoggedIn,
        login,
        logOut,
    };

    return (
        <AuthContext.Provider value={authData}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
