import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

export default function ItemAddForm(props) {
    const { setAreDatasFetched, setIsAddFormVisible, handleCancel } =
        props;

    const { register, handleSubmit } = useForm();
    let itemCollection;

    const [selectedOption, setSelectedOption] = useState('');
    const [categories, setCategories] = useState('');

    const onSubmit = async (data) => {
        // Besoin de JSON.stringify(data) pour envoyer en DB ?
        itemCollection = data;
        console.log(itemCollection);
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

    const [areCategoriesFetched, setAreCategoriesFetched] =
        useState(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                let categoriesResult = await axios.get(
                    `${process.env.REACT_APP_API_URI}/categories`
                );
                setCategories(categoriesResult.data.result);
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
                                value={category._id} // PIN : je passe l'id, est-ce bien ? C'est pas mieux de passer le slug puis de récup l'id via une requête dans `onSubmit`
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
                />
                <textarea
                    autoComplete='off'
                    {...register('description')}
                    rows='5'
                    cols='33'
                    placeholder={'Description'}
                />
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
