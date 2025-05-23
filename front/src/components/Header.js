import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../img/logomyrentwhite.png';
import logoAdmin from '../img/logo-admin.png';
import headerImage from '../img/image-header.png';
import headerImageCamion from '../img/image-header-camion.png';

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
                    <div className="header-image">
                        <img src={headerImage} alt="Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="header-image-camion">
                        <img src={headerImageCamion} alt="Header Camion" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
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
                        <Link to="/admin" className="nav-button account-button">
                            Mon compte
                            <img src={logoAdmin} alt="Admin" />
                        </Link>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Header; 