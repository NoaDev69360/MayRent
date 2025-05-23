import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormFilterAccueil.css';

function FormFilterAccueil() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        departure: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Vous pouvez stocker les données du formulaire dans localStorage si nécessaire
        localStorage.setItem('searchData', JSON.stringify(formData));
        navigate('/intermediaire-produit');
    };

    return (
        <div className="form-filter-wrapper">
            <div className="search-form-container">
                <h1 className="search-form-title">
                    La solution idéale pour<br />
                    votre location de voiture
                </h1>
                <form className="search-form" onSubmit={handleSearch}>
                    <div className="form-group">
                        <label htmlFor="departure">Lieu de départ</label>
                        <input
                            type="text"
                            id="departure"
                            placeholder="Entrez votre lieu de départ"
                            value={formData.departure}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Date de début</label>
                        <input
                            type="date"
                            id="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">Date de fin</label>
                        <input
                            type="date"
                            id="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="search-button">
                        Rechercher une voiture
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormFilterAccueil; 