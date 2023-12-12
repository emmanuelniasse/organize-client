import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import img1 from '../../img/img1.jpg';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [cookies, setCookie] = useCookies('');

    const onSubmit = async (userPayload) => {
        console.log(userPayload);
        console.log('api : ' + process.env.REACT_APP_API_URI);

        try {
            console.log('avant loginStatus');
            console.log('AVANT loginStatus : ' + userPayload);
            const loginStatus = await axios.post(
                `${process.env.REACT_APP_API_URI}/login`,
                userPayload,
                {
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                    // withCredentials: true, // Permet l'envoi de cookies
                }
            );
            console.log("Apres login status");
            console.log("login status : " + loginStatus.request.status);
            setCookie('token', loginStatus.data.token);
            if (loginStatus.request.status === 200) {
                window.location.replace('/');
            }
        } catch (err) {
            console.log("ERREUR" + err);
        }
    };
    return (
        <div className='page-container align-items-center'>
            <div className='flex align-items-center'>
                <div className='page-container__image w49'>
                    <img src={img1} className='w85' />
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='form'
                >
                    <h2>Connexion</h2>
                    <hr className='my-1' />

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

                    <div className='form__inputs-group column'>
                        <label htmlFor='pseudo'>Pseudo :</label>
                        <input
                            autoComplete='off'
                            {...register('pseudo')}
                            placeholder={'Entrez votre pseudo'}
                            name='pseudo'
                        />
                        <label htmlFor='password'>
                            Mot de passe :
                        </label>
                        <input
                            autoComplete='off'
                            {...register('password')}
                            placeholder={'Entrez mot de passe'}
                            type='password'
                            name='password'
                        />
                        <input
                            type='submit'
                            className={'btn btn-add'}
                            value={'Se connecter'}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
