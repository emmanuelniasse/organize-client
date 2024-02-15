import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext.jsx";

import img2 from "../../img/img2.jpg";

export default function Signup() {
    const { register, handleSubmit } = useForm();
    const redirect = useNavigate();
    const { setFlashMessage } = useAuth();

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
                redirect("/connexion");
                setFlashMessage({
                    message: "Incription réalisée avec succès, connectez-vous",
                    type: "success",
                });
            }
        } catch (err) {
            // TODO : Redondance ! Exactement le meme code, juste le message change
            let errorMsg = "Erreur lors de l'inscription.";
            const errorResponseMsg = err.response.data;

            errorResponseMsg && (errorMsg = errorResponseMsg);

            setFlashMessage({
                message: errorMsg,
                type: "error",
            });
        }
    };

    return (
        <div className="page-container justify-and-align-center">
            <div className="h-min-100 flex justify-and-align-center">
                <div className="page-container__image w49">
                    <img src={img2} className="w100" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="form">
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
