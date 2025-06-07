import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../config/api';
import './connexion.css';
import logo from '../img/logomyrentwhite.png';

function Connexion() {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [siret, setSiret] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Vérifier si l'utilisateur est déjà connecté
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Vérifier si le token est valide
            fetch('http://localhost:3000/api/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.ok) {
                    navigate('/');
                } else {
                    localStorage.removeItem('token');
                }
            })
            .catch(() => {
                localStorage.removeItem('token');
            });
        }
    }, [navigate]);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await api.post('/login', { email, password });

            // Stockage du token JWT
            localStorage.setItem('token', data.token);
            
            // Stockage des informations utilisateur
            localStorage.setItem('user', JSON.stringify({
                email: data.user.email,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                type: data.user.type
            }));

            // Redirection vers la page d'accueil
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await api.post('/register', {
                prenom: firstName,
                nom: lastName,
                email: email,
                password: password,
                telephone: phone
            });

            // Stockage du token JWT après inscription réussie
            localStorage.setItem('token', data.token);
            
            // Stockage des informations utilisateur
            localStorage.setItem('user', JSON.stringify({
                email: data.user.email,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                type: data.user.type
            }));

            // Redirection vers la page d'accueil
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleProSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await api.post('/register', {
                prenom: firstName,
                nom: lastName,
                email: email,
                password: password,
                telephone: phone,
                siret: siret,
                type: 'professionnel'
            });

            // Stockage du token JWT après inscription réussie
            localStorage.setItem('token', data.token);
            
            // Stockage des informations utilisateur
            localStorage.setItem('user', JSON.stringify({
                email: data.user.email,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                type: data.user.type,
                siret: data.user.siret
            }));

            // Redirection vers la page d'accueil
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    // Fonction pour se déconnecter
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/connexion');
    };

    return (
        <div className="login-container">
            <div className="login-form-section">
                <div className="login-form-container">
                    {error && <div className="error-message">{error}</div>}
                    <div className="tabs">
                        <button 
                            className={`tab ${activeTab === 'login' ? 'active' : ''}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Connexion
                        </button>
                        <button 
                            className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
                            onClick={() => setActiveTab('signup')}
                        >
                            Inscription Particulier
                        </button>
                        <button 
                            className={`tab ${activeTab === 'pro' ? 'active' : ''}`}
                            onClick={() => setActiveTab('pro')}
                        >
                            Inscription Pro
                        </button>
                    </div>

                    {activeTab === 'login' && (
                        <form onSubmit={handleLoginSubmit}>
                            <h2>Connexion</h2>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Mot de passe</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-button">Se connecter</button>
                            <div className="login-links">
                                <a href="/mot-de-passe-oublie">Mot de passe oublié ?</a>
                            </div>
                        </form>
                    )}

                    {activeTab === 'signup' && (
                        <form onSubmit={handleSignupSubmit}>
                            <h2>Inscription Particulier</h2>
                            <div className="form-group">
                                <label htmlFor="firstName">Prénom</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Nom</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signup-email">Email</label>
                                <input
                                    type="email"
                                    id="signup-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signup-phone">Téléphone</label>
                                <input
                                    type="tel"
                                    id="signup-phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signup-password">Mot de passe</label>
                                <input
                                    type="password"
                                    id="signup-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-button">S'inscrire</button>
                        </form>
                    )}

                    {activeTab === 'pro' && (
                        <form onSubmit={handleProSignupSubmit}>
                            <h2>Inscription Professionnel</h2>
                            <div className="form-group">
                                <label htmlFor="pro-firstName">Prénom</label>
                                <input
                                    type="text"
                                    id="pro-firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pro-lastName">Nom</label>
                                <input
                                    type="text"
                                    id="pro-lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="siret">Numéro SIRET</label>
                                <input
                                    type="text"
                                    id="siret"
                                    value={siret}
                                    onChange={(e) => setSiret(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pro-email">Email</label>
                                <input
                                    type="email"
                                    id="pro-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pro-phone">Téléphone</label>
                                <input
                                    type="tel"
                                    id="pro-phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pro-password">Mot de passe</label>
                                <input
                                    type="password"
                                    id="pro-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="login-button">S'inscrire</button>
                        </form>
                    )}
                </div>
            </div>
            <div className="login-image-section">
                <Link to="/">
                    <img src={logo} alt="MayRent Logo" />
                </Link>
            </div>
        </div>
    );
}

export default Connexion; 