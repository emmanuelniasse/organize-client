import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Expenses from './pages/Expenses/Expenses';

export default function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Expenses />} />
        </Routes>
    );
}
