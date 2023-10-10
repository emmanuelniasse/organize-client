import React from 'react';
import axios from 'axios';
import slugify from 'slugify';

export default function ItemAddForm(props) {
    const slugify = require('slugify');
    const { setAreDatasFetched, setIsAddFormVisible, handleCancel } =
        props;

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let itemCollection = {
            name: event.target[0].value,
            sum: event.target[1].value,
            slug: slugify(event.target[0].value).toLowerCase(),
        };
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URI}/expenses`,
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
                    placeholder='Libellé de la dépense'
                    required
                />
                <input
                    type='number'
                    name='sum'
                    placeholder='Somme'
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
