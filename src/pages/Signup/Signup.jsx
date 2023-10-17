import React from 'react';
import { useForm } from 'react-hook-form';

export default function Signup() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <input
                    autoComplete='off'
                    {...register('username')}
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
