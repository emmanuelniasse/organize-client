import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "../Components/Toast/Toast.jsx";
const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [flashMessage, setFlashMessage] = useState({});

    const userInformations = {
        isLoggedIn,
        setIsLoggedIn,
        flashMessage,
        setFlashMessage,
    };

    // TODO : Séparer cette partie du code
    useEffect(() => {
        switch (flashMessage.type) {
            case "success":
                toast.success(
                    <span className="success-notif">
                        {flashMessage.message}
                    </span>
                );
                break;
            case "error":
                toast.error(
                    <span className="error-notif">{flashMessage.message}</span>
                );
                break;
            default:
                toast(
                    <span className="default-notif">
                        {flashMessage.message}
                    </span>
                );
                break;
        }
    }, [flashMessage]);

    return (
        <AuthContext.Provider value={userInformations}>
            {props.children}
        </AuthContext.Provider>
    );
}
