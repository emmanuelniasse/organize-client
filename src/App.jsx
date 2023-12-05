import React from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';

// Pages
import Expenses from './pages/Expenses/Expenses';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

import { useAuth } from './Contexts/AuthContext.jsx';

export default function App() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    return (
        <Routes>
            {isLoggedIn ? (
                <>
                    <Route path='/' element={<Expenses />} />
                </>
            ) : (
                <>
                    <Route path='/' element={<Expenses />} />
                    <Route
                        exact
                        path='/connexion'
                        element={<Login />}
                    />
                    <Route
                        exact
                        path='/inscription'
                        element={<Signup />}
                    />
                    <Route path='*' element={<Expenses />} />
                </>
            )}
            {/* PIN : Voir si la redirection est assez correcte ou pas  assez safe */}
        </Routes>
    );
}
