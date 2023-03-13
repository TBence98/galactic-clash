import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { CharactersContextProvider } from "./store/characters-context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <CharactersContextProvider>
                <App />
            </CharactersContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
