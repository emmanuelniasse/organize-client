import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Signup() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (userPayload) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URI}/signup`,
                userPayload
            );
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <input
                    autoComplete='off'
                    {...register('pseudo')}
                    placeholder={'Pseudo'}
                />
                <input
                    autoComplete='off'
                    {...register('password')}
                    placeholder={'Mot de passe'}
                    type='password'
                />
                <input
                    type='submit'
                    className={'btn btn-add'}
                    value={'Connexion'}
                />
            </form>
        </>
    );
}
