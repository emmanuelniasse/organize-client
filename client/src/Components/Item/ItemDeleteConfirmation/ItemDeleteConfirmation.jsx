import React from 'react';
import axios from 'axios';

export default function ItemDeleteConfirmation(props) {
    const {
        setDeleteConfirmation,
        handleCancel,
        setAreDatasFetched,
        setItems,
        items,
        collectionName,
    } = props;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await Promise.all(
                items.map(async (itemId) => {
                    await axios.delete(
                        `https://tst2-ten.vercel.app//${collectionName}/${itemId}`
                    );
                    setAreDatasFetched(false);
                })
            );
        } catch (error) {
            console.log('error:', error);
        }
        setAreDatasFetched(false);
        setDeleteConfirmation(false);
        setItems([]);
    };
    return (
        <>
            <form onSubmit={handleSubmit} className='form'>
                <div className='form__buttons'>
                    <div
                        className='btn-cancel btn'
                        onClick={handleCancel}
                    >
                        Annuler
                    </div>
                    <button className='btn-delete btn' type='submit'>
                        Confirmer la suppression
                    </button>
                </div>
            </form>
        </>
    );
}
