import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [cookies, setCookie] = useCookies('');

    const onSubmit = async (userPayload) => {
        try {
            const loginStatus = await axios.post(
                `${process.env.REACT_APP_API_URI}/login`,
                userPayload,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'anyVal',
                    },
                }
            );
            setCookie('token', loginStatus.data.token);
            if (loginStatus.request.status === 200) {
                window.location.replace('/');
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <h1>Login</h1>
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
            <Link to='/inscription' className='btn btn-add'>
                S'inscrire
            </Link>
        </>
    );
}
