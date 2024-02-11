import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext.jsx";

import logo from "../../img/logos/logo.png";

export default function Navbar() {
    const [cookies, setCookie, removeCookie] = useCookies("token");
    const { isLoggedIn, setIsLoggedIn, setFlashMessage } = useAuth();
    const logout = async () => {
        try {
            removeCookie("token");
            setIsLoggedIn(false);
            setFlashMessage({
                message: "À bientôt sur Organize !",
            });
        } catch (err) {
            throw new Error("Erreur lors du processus de déconnexion");
        }
    };
    return (
        <>
            <nav className="navbar">
                <div className="navbar__nav container">
                    <div className="navbar__nav__logo logo">
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    {isLoggedIn && (
                        <div className="navbar__links">
                            <ul>
                                <li className="btn btn-cancel" onClick={logout}>
                                    Déconnexion
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
