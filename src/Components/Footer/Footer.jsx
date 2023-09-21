import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logos/logo.png';

export default function Footer() {
    return (
        <>
            <footer>
                <div className='container footer'>
                    <div className='footer__logo logo'>
                        <Link to='/'>
                            <img src={logo} alt='logo' />
                        </Link>
                    </div>
                </div>
            </footer>
        </>
    );
}
