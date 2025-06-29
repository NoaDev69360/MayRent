import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../img/logomyrentwhite.png';
import logoAdmin from '../img/logo-admin.png';
import headerImage from '../img/ami-voiture.jpg';
import headerImageCamion from '../img/image-header-camion.png';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isLoginPage = location.pathname === '/connexion';
    const isHome = location.pathname === '/';

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

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/connexion');
    };

    function isAdmin() {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.roles) return false;
            return user.roles.includes('ROLE_ADMIN');
        } catch {
            return false;
        }
    }

    return (
        <div className={`header-container${isHome ? ' home-header' : ''}`}>
            {isHome ? (
                <>
                    <div className="header-image">
                        <img src={headerImage} alt="Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="header-image-camion">
                        <img src={headerImageCamion} alt="Header Camion" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                </>
            ) : (
                <div className="header-image">
                    <img src={headerImage} alt="Header" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            )}
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-content">
                    <Link to="/" className="logo">
                        <img src={logo} alt="MayRent" />
                    </Link>
                    <nav className="nav-links" style={{marginLeft: 'auto'}}>
                        {isLoggedIn ? (
                            <>
                                <button className="nav-button" onClick={handleLogout}>Déconnexion</button>
                                <button className="nav-button" onClick={() => navigate('/mon-compte')}>Mon compte</button>
                            </>
                        ) : (
                            <>
                                <Link to="/connexion" className="nav-button">Connexion</Link>
                                <Link to="/inscription" className="nav-button">Inscription</Link>
                            </>
                        )}
                        {isLoggedIn && isAdmin() && (
                            <a href="http://localhost:8080/admin" target="_blank" rel="noopener noreferrer" className="nav-button account-button">
                                Admin
                                <img src={logoAdmin} alt="Admin" />
                            </a>
                        )}
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Header; 