import React from 'react';
import axios from 'axios';
import slugify from 'slugify';

export default function CategoryAddForm(props) {
    let slugify = require('slugify');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target[0].value);
        // Traitez les données du formulaire ici
        let category = {
            name: event.target[0].value,
            slug: slugify(event.target[0].value).toLowerCase(),
        };

        try {
            await axios.post(
                `http://localhost:3000/categories/`,
                category
            );
            props.setAreCategoriesFetched(false);
        } catch (error) {
            console.log('error:', error);
        }
        props.setIsAddFormVisible(false);
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
                        onClick={props.handleCancel}
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
