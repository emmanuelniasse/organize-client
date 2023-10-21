import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Signup() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (userPayload) => {
        try {
            const signupStatus = await axios.post(
                `${process.env.REACT_APP_API_URI}/signup`,
                userPayload
            );

            signupStatus.request.status === 200 &&
                window.location.replace('/connexion');
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
                    value={"S'inscrire"}
                />
            </form>
            <Link to='/connexion' className='btn btn-add'>
                Se connecter
            </Link>
        </>
    );
}
