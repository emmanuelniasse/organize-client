import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [flashMessage, setFlashMessage] = useState("");

    const userInformations = {
        isLoggedIn,
        setIsLoggedIn,
        flashMessage,
        setFlashMessage,
    };

    return (
        <AuthContext.Provider value={userInformations}>
            {props.children}
        </AuthContext.Provider>
    );
}
