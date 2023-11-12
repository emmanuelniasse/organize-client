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
            <form onSubmit={handleSubmit(onSubmit)} className='form'>
                <h2>Connexion</h2>

                <p className='flash-message'>
                    Vous n'avez pas encore de compte ?
                    <br />
                    <Link
                        to='/inscription'
                        className='bold underline'
                    >
                        Créer-le maintenant
                    </Link>
                </p>
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
                    value={'Se connecter'}
                />
            </form>
        </>
    );
}
