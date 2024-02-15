import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

// Pages
import Expenses from "./pages/Expenses/Expenses";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

import { useAuth } from "./Contexts/AuthContext.jsx";

export default function App() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const [cookies] = useCookies(["token"]);

    // TODO : Je vérifie uniquement si le token est présent ? Pas bon du tout
    useEffect(() => {
        const token = cookies.token;

        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [cookies.token, setIsLoggedIn]);

    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                {isLoggedIn ? (
                    <>
                        <Route index element={<Expenses />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </>
                ) : (
                    <>
                        <Route path="/connexion" element={<Login />} />
                        <Route path="/inscription" element={<Signup />} />
                        <Route index element={<Navigate to="/connexion" />} />
                        <Route
                            path="*"
                            element={<Navigate to="/connexion" />}
                        />
                    </>
                )}
            </Route>
        </Routes>
    );
}
