import React from 'react';
import axios from 'axios';
import slugify from 'slugify';

export default function ItemAddForm(props) {
    const slugify = require('slugify');
    const {
        subcategoryName,
        categoryName,
        collectionName,
        setAreDatasFetched,
        setIsAddFormVisible,
        handleCancel,
    } = props;

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let itemCollection;

        // Check collection name
        switch (collectionName) {
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
            case 'itemslist':
                itemCollection = {
                    name: event.target[0].value,
                    slug: slugify(
                        event.target[0].value
                    ).toLowerCase(),
                    category: slugify(categoryName).toLowerCase(),
                    subcategory:
                        slugify(subcategoryName).toLowerCase(),
                };
                break;
            default:
                break;
        }

        try {
            await axios.post(
                `http://localhost:3000/${collectionName}`,
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
