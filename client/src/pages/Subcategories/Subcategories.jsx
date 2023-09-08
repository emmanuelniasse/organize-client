import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Components
import Category from '../../Components/Categories/Category/Category';

import { useParams, Link } from 'react-router-dom';

export default function Subcategories() {
    let { subcategory } = useParams();
    const [subcategories, setSubcategories] = useState([]);
    const [areSubcategoriesFetched, setAreSubcategoriesFetched] =
        useState(false);

    useEffect(() => {
        const getSubcategories = async () => {
            try {
                const subcategories = await axios.get(
                    'http://localhost:3000/subcategories/'
                );
                setSubcategories(subcategories.data.result);
                console.log(subcategories.data.result);
                setAreSubcategoriesFetched(true);
                console.log('Boucle infinie ?');
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (subcategories) : ' +
                        err
                );
            }
        };
        if (!areSubcategoriesFetched) {
            getSubcategories();
        }
    }, [areSubcategoriesFetched]);

    return (
        <div className='categories'>
            <h1 className='categories__title title-page'>
                Subcategories {subcategory}
            </h1>

            {subcategories.map((category) => {
                return (
                    <li key={category._id}>
                        <Link to={category.slug}>
                            <Category
                                name={category.name}
                                slug={category.slug}
                                setCategories={setSubcategories}
                            />
                        </Link>
                    </li>
                );
            })}
        </div>
    );
}
