import React from 'react';
import axios from 'axios';

export default function ExpenseUpdateForm(props) {
    const {
        items,
        setAreDatasFetched,
        setIsUpdateFormVisible,
        setItems,
        handleCancel,
        collectionName,
    } = props;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let itemsSelectionned = items;

        // Traitez les données du formulaire ici
        let expenseUpdated = {
            name: event.target[0].value,
        };

        try {
            await axios.put(
                `${process.env.REACT_APP_API_URI}/${collectionName}/${itemsSelectionned}`,
                expenseUpdated
            );
            setAreDatasFetched(false);
        } catch (error) {
            console.log('error:', error);
        }
        setIsUpdateFormVisible(false);
        setItems([]);
    };
    return (
        <>
            <form onSubmit={handleFormSubmit} className='form'>
                {/* Ajoutez vos champs de formulaire ici */}
                <input
                    type='text'
                    name='name'
                    placeholder='Nom de la catégorie'
                    autoComplete='off'
                    required
                />
                <div className='form__buttons'>
                    <div
                        className='btn-cancel btn'
                        onClick={handleCancel}
                    >
                        Annuler
                    </div>
                    <button className='btn-update btn' type='submit'>
                        Mettre à jour
                    </button>
                </div>
            </form>
        </>
    );
}
