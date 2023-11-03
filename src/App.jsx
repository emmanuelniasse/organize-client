import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';

// Pages
import Expenses from './pages/Expenses/Expenses';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

const AuthGuard = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cookies, setCookies] = useCookies('token');

    useEffect(() => {
        if (cookies.token) {
            setIsAuthenticated(true);
        } else {
            navigate('/connexion');
        }
    }, [cookies, navigate]);

    if (!isAuthenticated) {
        return null;
    }
    return <Outlet />; // Rend la sous-route (route imbriquée)
};

export default function App() {
    // Vérifie si lutilisateur à un token dans le cookie, si c'est le cas il peut avoir acces à "/"

    return (
        <Routes>
            <Route element={<AuthGuard />}>
                <Route index element={<Expenses />} />
            </Route>
            <Route exact path='/connexion' element={<Login />} />
            <Route exact path='/inscription' element={<Signup />} />
        </Routes>
    );
}
