import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../img/logomyrentwhite.png';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === '/connexion';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="header-container">
            {!isLoginPage && (
                <>
                    <div className="header-image"></div>
                    <div className="header-image-camion"></div>
                </>
            )}
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-content">
                    <Link to="/" className="logo">
                        <img src={logo} alt="MayRent" />
                    </Link>
                    <nav className="nav-links">
                        <Link to="/connexion" className="nav-button">Connexion</Link>
                        <Link to="/inscription" className="nav-button">Inscription</Link>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Header; 