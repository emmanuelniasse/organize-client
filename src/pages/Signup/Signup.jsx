import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FlashMessage from '../../Components/FlashMessage/FlashMessage';

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
                        'ngrok-skip-browser-warning': 'anyValue',
                    },
                }
            );

            if (signupStatus.request.status === 200) {
                // Notif
                setNotification(true);

                // Redirection après 5s
                displayTime.current = 5;
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
            {notification && (
                <FlashMessage
                    message={
                        'Inscription réussie, redirection vers la page connexion dans ${s} secondes'
                    }
                    displayTime={displayTime.current * 1000}
                />
            )}
            <Link to='/connexion' className='btn btn-add'>
                Se connecter
            </Link>
        </>
    );
}
