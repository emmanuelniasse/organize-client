import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import FlashMessage from "../../Components/FlashMessage/FlashMessage";

import img2 from "../../img/img2.jpg";

export default function Signup() {
    const { register, handleSubmit } = useForm();
    const [notification, setNotification] = useState(false);
    const displayTime = useRef(0);
    const redirect = useNavigate();

    const onSubmit = async (userPayload) => {
        try {
            const signupStatus = await axios.post(
                `${process.env.REACT_APP_API_URI}/signup`,
                userPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (signupStatus.request.status === 200) {
                setNotification(true);

                // Redirection après 3s
                displayTime.current = 3;
                setTimeout(() => {
                    redirect("/connexion");
                }, displayTime.current * 1000);
            }
        } catch (err) {
            throw new Error("Erreur lors du processus d'inscription");
        }
    };

    return (
        <div className="page-container align-items-center">
            <div className="flex align-items-center">
                <div className="page-container__image w49">
                    <img src={img2} className="w85" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    {notification && (
                        <FlashMessage
                            message={
                                "Inscription réussie, redirection vers la page connexion dans ${s} secondes"
                            }
                            displayTime={displayTime.current * 1000}
                        />
                    )}

                    <h2>Inscription</h2>
                    <hr className="my-1" />

                    <p className="message">
                        Déjà inscrit ?
                        <br />
                        <Link to="/connexion" className="bold underline">
                            Connectez-vous
                        </Link>
                    </p>
                    <div className="form__inputs-group column">
                        <label htmlFor="pseudo">Pseudo :</label>
                        <input
                            autoComplete="off"
                            {...register("pseudo")}
                            placeholder={"Entrez votre pseudo"}
                            name="pseudo"
                        />
                        <label htmlFor="password">Mot de passe :</label>

                        <input
                            autoComplete="off"
                            {...register("password")}
                            placeholder={"Entrez mot de passe"}
                            type="password"
                            name="password"
                        />
                        <input
                            type="submit"
                            className={"btn btn-add"}
                            value={"S'inscrire"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
