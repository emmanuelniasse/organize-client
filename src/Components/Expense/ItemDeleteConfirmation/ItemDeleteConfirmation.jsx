import React from 'react';
import axios from 'axios';

export default function ItemDeleteConfirmation(props) {
    const {
        setDeleteConfirmation,
        handleCancel,
        setAreExpensesFetched,
        setItems,
        setCompleteItem,
        items,
    } = props;

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await Promise.all(
                items.map(async (itemId) => {
                    await axios.delete(
                        `${process.env.REACT_APP_API_URI}/expenses/${itemId}`,
                        {
                            headers: {
                                'ngrok-skip-browser-warning':
                                    'anyVal',
                            },
                        }
                    );
                    setAreExpensesFetched(false);
                })
            );
        } catch (error) {
            console.log('error:', error);
        }
        setAreExpensesFetched(false);
        setDeleteConfirmation(false);
        setItems([]);
        setCompleteItem([]);
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
