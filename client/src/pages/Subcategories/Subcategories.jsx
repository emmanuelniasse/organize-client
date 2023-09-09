import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Components
import Category from '../../Components/Categories/Category/Category';

import { useParams, Link } from 'react-router-dom';

export default function Subcategories() {
    let { category } = useParams();
    const [subcategories, setSubcategories] = useState([]);
    const [areSubcategoriesFetched, setAreSubcategoriesFetched] =
        useState(false);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        const getSubcategories = async () => {
            try {
                const subcategories = await axios.get(
                    `http://localhost:3000/${category}/subcategories/`
                );
                setSubcategories(subcategories.data.result);
                setAreSubcategoriesFetched(true);

                const categoryResponse = await axios.get(
                    `http://localhost:3000/categories`
                );

                const categoriesResult = categoryResponse.data.result;
                categoriesResult.forEach((categoryResult) => {
                    categoryResult.slug == category &&
                        setCategoryName(categoryResult.name);
                });
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
                {categoryName}
            </h1>

            {subcategories.map((subcategory) => {
                return (
                    <li key={subcategory._id}>
                        <Link to={`/${category}/${subcategory.slug}`}>
                            <Category
                                name={subcategory.name}
                                slug={subcategory.slug}
                                setCategories={setSubcategories}
                            />
                        </Link>
                    </li>
                );
            })}
        </div>
    );
}
