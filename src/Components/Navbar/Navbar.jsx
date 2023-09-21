import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logos/logo.png';

export default function Navbar() {
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
            </nav>
        </>
    );
}
