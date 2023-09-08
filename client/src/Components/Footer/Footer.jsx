import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logos/logo-blue.png';

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
                    <div className='footer__links'>
                        {/* Social  */}
                        <ul className='footer__links__social'>
                            <span>Nos réseaux</span>
                            <li>
                                <Link
                                    to='https://www.linkedin.com/'
                                    target='_blank'
                                >
                                    Linkedin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='https://twitter.com/'
                                    target='_blank'
                                >
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='https://www.twitch.tv/'
                                    target='_blank'
                                >
                                    Twitch
                                </Link>
                            </li>
                        </ul>

                        {/* Contact  */}
                        <ul>
                            <span>Nous contacter</span>
                            <li>
                                <Link to='mailto:admissions@efrei.fr'>
                                    Mail
                                </Link>
                            </li>
                            <li>Paris : +33 188 289 001</li>
                            <li>Bordeaux : +33 582 060 162</li>
                            <li>
                                <Link to='/don'>Faire un don</Link>
                            </li>
                            <li>
                                <Link to='/conditions-generales-utilisation'>
                                    CGU
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
}
