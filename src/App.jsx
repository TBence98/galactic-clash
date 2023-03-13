import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import RootLayout from "./components/RootLayout/RootLayout";
import CharacterSelect from "./pages/CharacterSelect";
import AuthContext from "./store/auth-context";

function App() {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <BrowserRouter>
            <Routes>
                {!isLoggedIn ? (
                    <Route path="/">
                        <Route
                            index
                            element={<Navigate replace to="/auth" />}
                        />
                        <Route path="/auth" element={<AuthPage />} />
                    </Route>
                ) : (
                    <Route path="/" element={<RootLayout />}>
                        <Route
                            path="/select-character"
                            element={<CharacterSelect />}
                        />
                    </Route>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
