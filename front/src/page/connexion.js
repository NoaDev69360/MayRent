import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './connexion.css';
import logo from '../img/logomyrentwhite.png';

function Connexion() {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [siret, setSiret] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log('Tentative de connexion avec:', email, password);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log('Inscription particulier:', { firstName, lastName, email, password });
    };

    const handleProSignupSubmit = (e) => {
        e.preventDefault();
        console.log('Inscription professionnel:', { firstName, lastName, email, password, siret });
    };

    return (
        <div className="login-container">
            <div className="login-form-section">
                <div className="login-form-container">
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
                <img src={logo} alt="MayRent Logo" />
            </div>
        </div>
    );
}

export default Connexion; 