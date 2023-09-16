import React from 'react';
import axios from 'axios';
import slugify from 'slugify';

export default function ItemAddForm(props) {
    const {
        categoryName,
        collectionName,
        setAreDatasFetched,
        setIsAddFormVisible,
        handleCancel,
    } = props;

    let slugify = require('slugify');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target[0].value);

        let collection = collectionName;

        let itemCollection;

        switch (collection) {
            case 'categories':
                itemCollection = {
                    name: event.target[0].value,
                    slug: slugify(
                        event.target[0].value
                    ).toLowerCase(),
                };
                break;
            case 'subcategories':
                itemCollection = {
                    name: event.target[0].value,
                    slug: slugify(
                        event.target[0].value
                    ).toLowerCase(),
                    category: slugify(categoryName).toLowerCase(),
                };
                break;
            default:
                console.log(`aucune.`);
        }
        try {
            await axios.post(
                `http://localhost:3000/${collection}/`,
                itemCollection
            );
            setAreDatasFetched(false);
        } catch (error) {
            console.log('error:', error);
        }
        setIsAddFormVisible(false);
    };
    return (
        <>
            <form onSubmit={handleFormSubmit} className='form'>
                {/* Ajoutez vos champs de formulaire ici */}
                <input
                    type='text'
                    name='name'
                    placeholder='Nom de la catégorie'
                    required
                />
                <div className='form__buttons'>
                    <div
                        className='btn-cancel btn'
                        onClick={handleCancel}
                        onTouchStart={handleCancel}
                    >
                        Annuler
                    </div>
                    <button className='btn-add btn' type='submit'>
                        Ajouter
                    </button>
                </div>
            </form>
        </>
    );
}
