import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FlashMessage from '../../Components/FlashMessage/FlashMessage';

import img2 from '../../img/img2.jpg';

export default function Signup() {
    const { register, handleSubmit } = useForm();
    const [notification, setNotification] = useState(false);
    const displayTime = useRef(0);

    const onSubmit = async (userPayload) => {
        try {
            const signupStatus = await axios.post(
                `${process.env.REACT_APP_API_URI}/signup`,
                userPayload,
                {
                    headers: {
                        'Content-Type': 'application/json', // Ajoutez le type de contenu
                    },
                    // withCredentials: true, // Permet l'envoi de cookies
                }
            );

            if (signupStatus.request.status === 200) {
                // Notif
                setNotification(true);

                // Redirection après 3s
                displayTime.current = 3;
                setTimeout(() => {
                    window.location.replace('/connexion');
                    console.log(
                        'Redirection après ' +
                            displayTime.current +
                            ' secondes'
                    );
                }, displayTime.current * 1000);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='page-container align-items-center'>
            <div className='flex align-items-center'>
                <div className='page-container__image w49'>
                    <img src={img2} className='w85' />
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='form'
                >
                    <h2>Inscription</h2>
                    <hr className='my-1' />

                    <p className='flash-message'>
                        Déjà inscrit ?
                        <br />
                        <Link
                            to='/connexion'
                            className='bold underline'
                        >
                            Connectez-vous
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
                            value={"S'inscrire"}
                        />
                    </div>
                </form>
            </div>

            {notification && (
                <FlashMessage
                    message={
                        'Inscription réussie, redirection vers la page connexion dans ${s} secondes'
                    }
                    displayTime={displayTime.current * 1000}
                />
            )}
        </div>
    );
}
