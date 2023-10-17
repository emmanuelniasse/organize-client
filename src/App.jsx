import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Expenses from './pages/Expenses/Expenses';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

export default function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/inscription' element={<Signup />} />
            <Route exact path='/depenses' element={<Expenses />} />
        </Routes>
    );
}
