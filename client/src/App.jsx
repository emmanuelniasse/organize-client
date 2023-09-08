import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Categories from './pages/Categories/Categories';
import Subcategories from './pages/Subcategories/Subcategories';

export default function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Categories />} />
            <Route
                exact
                path='/:subcategory'
                element={<Subcategories />}
            />
        </Routes>
    );
}
