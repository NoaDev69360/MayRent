import React, { useState } from 'react';
import { api } from '../services/api';

function SignupForm() {
    const [activeTab, setActiveTab] = useState('particulier');
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        password: '',
        confirmPassword: '',
        telephone: '',
        siret: '', // Pour pro
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.prenom) formErrors.prenom = 'Le prénom est requis';
        if (!formData.nom) formErrors.nom = 'Le nom est requis';
        if (!formData.email) {
            formErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'L\'adresse email est invalide';
        }
        if (!formData.password) {
            formErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            formErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }
        if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }
        if (!formData.telephone) {
            formErrors.telephone = 'Le numéro de téléphone est requis';
        } else if (!/^[0-9]{10}$/.test(formData.telephone.replace(/\s/g, ''))) {
            formErrors.telephone = 'Le numéro de téléphone doit contenir 10 chiffres';
        }
        if (activeTab === 'pro' && !formData.siret) {
            formErrors.siret = 'Le numéro SIRET est requis';
        }
        return formErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            setIsLoading(true);
            try {
                let payload = {
                    prenom: formData.prenom,
                    nom: formData.nom,
                    email: formData.email,
                    password: formData.password,
                    telephone: formData.telephone
                };
                if (activeTab === 'pro') {
                    payload.siret = formData.siret;
                    payload.type = 'professionnel';
                } else if (activeTab === 'locataire') {
                    payload.type = 'locataire';
                } else {
                    payload.type = 'particulier';
                }
                await api.post('/register', payload);
                setSubmitted(true);
                setFormData({
                    prenom: '',
                    nom: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    telephone: '',
                    siret: '',
                });
                setErrors({});
            } catch (error) {
                setErrors({ 
                    apiError: error.message || 'Une erreur est survenue lors de l\'inscription'
                });
            } finally {
                setIsLoading(false);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="signup-container">
            <h2>Inscription</h2>
            <div className="tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button className={`tab ${activeTab === 'particulier' ? 'active' : ''}`} onClick={() => setActiveTab('particulier')}>Loueur Particulier</button>
                <button className={`tab ${activeTab === 'pro' ? 'active' : ''}`} onClick={() => setActiveTab('pro')}>Loueur Professionnel</button>
                <button className={`tab ${activeTab === 'locataire' ? 'active' : ''}`} onClick={() => setActiveTab('locataire')}>Locataire</button>
            </div>
            {submitted && (
                <div className="success-message">
                    Inscription réussie ! Vous pouvez maintenant vous connecter.
                </div>
            )}
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label>Prénom</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        className={errors.prenom ? 'error' : ''}
                    />
                    {errors.prenom && <span className="error-message">{errors.prenom}</span>}
                </div>
                <div className="form-group">
                    <label>Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        className={errors.nom ? 'error' : ''}
                    />
                    {errors.nom && <span className="error-message">{errors.nom}</span>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                {activeTab === 'pro' && (
                    <div className="form-group">
                        <label>Numéro SIRET</label>
                        <input
                            type="text"
                            name="siret"
                            value={formData.siret}
                            onChange={handleChange}
                            className={errors.siret ? 'error' : ''}
                        />
                        {errors.siret && <span className="error-message">{errors.siret}</span>}
                    </div>
                )}
                <div className="form-group">
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label>Confirmer le mot de passe</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'error' : ''}
                    />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
                <div className="form-group">
                    <label>Téléphone</label>
                    <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        className={errors.telephone ? 'error' : ''}
                        placeholder="06 12 34 56 78"
                    />
                    {errors.telephone && <span className="error-message">{errors.telephone}</span>}
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
                </button>
                {errors.apiError && <div className="api-error">{errors.apiError}</div>}
            </form>
        </div>
    );
}

export default SignupForm;
