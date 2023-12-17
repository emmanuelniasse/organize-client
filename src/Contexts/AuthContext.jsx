import React, { useState, useContext, useEffect} from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const userInformations = {
        isLoggedIn,
        setIsLoggedIn,
    };

    return (
        <AuthContext.Provider value={userInformations}>
            {props.children}
        </AuthContext.Provider>
    );
}
