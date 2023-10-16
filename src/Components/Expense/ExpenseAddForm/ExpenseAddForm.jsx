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
        completeItem,
    } = props;

    const { register, handleSubmit } = useForm();
    let newExpense;

    // States
    const [selectedOption, setSelectedOption] = useState('');
    const [categories, setCategories] = useState('');
    const [areCategoriesFetched, setAreCategoriesFetched] =
        useState(false);

    const onSubmit = async (data) => {
        newExpense = data;
        try {
            switch (action) {
                case 'update':
                    await axios.put(
                        `${process.env.REACT_APP_API_URI}/expenses/${itemSelected}`,
                        newExpense
                    );
                    setItems([]);
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
                    defaultValue={completeItem.name}
                />

                <select
                    {...register('category')}
                    defaultValue={selectedOption}
                    onChange={(e) =>
                        setSelectedOption(e.target.value)
                    }
                >
                    <option value='' defaultValue>
                        --- Catégorie de la dépense ---
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
                    defaultValue={completeItem.sum}
                />
                <textarea
                    autoComplete='off'
                    {...register('description')}
                    rows='5'
                    cols='33'
                    placeholder={'Description'}
                    defaultValue={completeItem.description}
                />
                <input type='hidden' value={action} />
                <div className='btn-group'>
                    <input
                        type='submit'
                        className='btn btn-add'
                        value='Ajouter'
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
