import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Categories from './pages/Categories/Categories';
import Subcategories from './pages/Subcategories/Subcategories';
import Items from './pages/Items/Items';

export default function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Categories />} />
            <Route
                exact
                path='/:category'
                element={<Subcategories />}
            />
            <Route
                exact
                path='/:category/:subcategory'
                element={<Items />}
            />
        </Routes>
    );
}
