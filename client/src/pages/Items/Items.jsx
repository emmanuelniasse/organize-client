import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Components
import Item from '../../Components/Categories/Category/Category';

import { useParams, Link } from 'react-router-dom';

export default function Items() {
    let { category, subcategory } = useParams();
    const [items, setItems] = useState([]);
    const [areItemsFetched, setAreItemsFetched] = useState(false);

    useEffect(() => {
        const getItems = async () => {
            try {
                const items = await axios.get(
                    'http://localhost:3000/category/subcategories/'
                );
                setItems(items.data.result);
                console.log(items.data.result);
                setAreItemsFetched(true);
                console.log('Boucle infinie ?');
            } catch (err) {
                console.log(
                    'Erreur lors de la requête (items) : ' + err
                );
            }
        };
        if (!areItemsFetched) {
            getItems();
        }
    }, [areItemsFetched]);

    return (
        <div className='categories'>
            <h1 className='categories__title title-page'>
                Items {category}
            </h1>

            {items.map((item) => {
                return (
                    <li key={item._id}>
                        <Item name={item.name} slug={item.slug} />
                    </li>
                );
            })}
        </div>
    );
}
