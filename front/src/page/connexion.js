import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './connexion.css';

function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ici, vous pourrez ajouter la logique de connexion
        console.log('Tentative de connexion avec:', email, password);
    };

    return (
        <div className="login-container">
            <div className="login-form-section">
                <div className="login-form-container">
                    <h2>Connexion</h2>
                    <form onSubmit={handleSubmit}>
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
                    </form>
                    <div className="login-links">
                        <a href="/mot-de-passe-oublie">Mot de passe oublié ?</a>
                        <a href="/inscription">Créer un compte</a>
                    </div>
                </div>
            </div>
            <div className="login-image-section">
                <img src="/img/image-header.png" alt="MayRent" />
            </div>
        </div>
    );
}

export default Connexion; 