import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { useAuth } from "../../Contexts/AuthContext.jsx";
import img1 from "../../img/img1.jpg";

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [cookies, setCookie] = useCookies("");
    const { setIsLoggedIn, setFlashMessage } = useAuth();

    const onSubmit = async (userPayload) => {
        try {
            const loginStatus = await axios.post(
                `${process.env.REACT_APP_API_URI}/login`,
                userPayload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: true,
                }
            );

            if (loginStatus.request.status === 200) {
                setCookie("token", loginStatus.data.result.token);
                setIsLoggedIn(true);
                setFlashMessage({
                    message: "Bienvenue sur Organize !",
                });
            }
        } catch (err) {
            // TODO : Redondance ! Exactement le meme code, juste le message change
            let errorMsg = "Erreur lors de la connexion.";
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
                    <img src={img1} className="w100" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <h2>Connexion</h2>
                    <hr className="my-1" />

                    <p className="message">
                        Vous n'avez pas encore de compte ?
                        <br />
                        <Link to="/inscription" className="bold underline">
                            Créer-le maintenant
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
                            value={"Se connecter"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
