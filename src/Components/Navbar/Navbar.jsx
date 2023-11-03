import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logos/logo.png';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Navbar() {
    const [cookies, setCookie, removeCookie] = useCookies('token');

    const logout = async () => {
        try {
            const logOut = await axios.post(
                `${process.env.REACT_APP_API_URI}/logout`,
                {
                    headers: {
                        'ngrok-skip-browser-warning': 'anyVal',
                    },
                }
            );
            removeCookie('token');
            console.log(logOut.request.tatus);
            if (logOut.request.status === 200) {
                window.location.replace('/connexion');
            }
        } catch (err) {
            console.log(err);
        }
        console.log(cookies);
    };

    return (
        <>
            <nav className='navbar'>
                <div className='navbar__nav container'>
                    <div className='navbar__nav__logo logo'>
                        <Link to='/'>
                            <img src={logo} alt='logo' />
                        </Link>
                    </div>
                </div>
                <div
                    className='logout btn btn-cancel'
                    onClick={logout}
                >
                    Déconnexion
                </div>
            </nav>
        </>
    );
}
