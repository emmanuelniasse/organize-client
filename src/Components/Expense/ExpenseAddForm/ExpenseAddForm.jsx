import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

export default function ExpenseAddForm(props) {
    const {
        setAreExpensesFetched,
        setIsAddFormVisible,
        setIsUpdateFormVisible,
        handleCancel,
        action,
        itemSelected,
        setItems,
        setCompleteItem,
        completeItem,
    } = props;

    const { register, handleSubmit } = useForm();

    // States
    const [selectedOption, setSelectedOption] = useState('');
    const [categories, setCategories] = useState('');
    const [areCategoriesFetched, setAreCategoriesFetched] =
        useState(false);

    const onSubmit = async (newExpense) => {
        try {
            switch (action) {
                case 'update':
                    await axios.put(
                        `${process.env.REACT_APP_API_URI}/expenses/${itemSelected}`, // PIN : au lieu de itemSelected => completeItem._id
                        newExpense
                    );

                    setItems([]);
                    setCompleteItem([]);
                    setIsUpdateFormVisible(false);
                    break;
                default:
                    await axios.post(
                        `${process.env.REACT_APP_API_URI}/expenses`,
                        newExpense
                    );
                    setIsAddFormVisible(false);
                    break;
            }
            setAreExpensesFetched(false);
        } catch (error) {
            console.log('error:', error);
            // PIN : Throw new err ?
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                let categoriesResult = await axios.get(
                    `${process.env.REACT_APP_API_URI}/categories`
                );
                setCategories(categoriesResult.data.result);
                setAreCategoriesFetched(true);
            } catch (error) {
                console.log('error:', error);
            }
        };
        if (!areCategoriesFetched) {
            getCategories();
        }
    }, [areCategoriesFetched]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <input
                    autoComplete='off'
                    {...register('name')}
                    placeholder={'Libellé'}
                    defaultValue={
                        completeItem ? completeItem.name : ''
                    }
                />

                <select
                    {...register('category')}
                    defaultValue={selectedOption}
                    onChange={(e) =>
                        setSelectedOption(e.target.value)
                    }
                >
                    <option
                        value={
                            completeItem && completeItem.category._id
                        }
                    >
                        {completeItem
                            ? completeItem.category.name
                            : '--- Catégorie de la dépense ---'}
                    </option>
                    {categories &&
                        categories.map((category) => (
                            <option
                                value={category._id}
                                key={category._id}
                            >
                                {category.name}
                            </option>
                        ))}
                </select>

                <input
                    autoComplete='off'
                    type='number'
                    {...register('sum')}
                    placeholder={'Somme'}
                    defaultValue={
                        completeItem ? completeItem.sum : ''
                    }
                />
                <textarea
                    autoComplete='off'
                    {...register('description')}
                    rows='5'
                    cols='33'
                    placeholder={'Description'}
                    defaultValue={
                        completeItem ? completeItem.description : ''
                    }
                />
                <input type='hidden' value={action} />
                <div className='btn-group'>
                    <input
                        type='submit'
                        className={
                            'btn ' +
                            (completeItem ? 'btn-update' : 'btn-add')
                        }
                        value={completeItem ? 'Modifier' : 'Ajouter'}
                    />
                    <input
                        className='btn btn-cancel'
                        type='button'
                        onClick={handleCancel}
                        value='Annuler'
                    />
                </div>
            </form>
        </>
    );
}
