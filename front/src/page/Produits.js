import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Header from '../components/Header';
import './Produits.css';
import { useLocation } from 'react-router-dom';

function Produits() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const location = useLocation();
    const vehicule = location.state?.vehicule;

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date > endDate) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const calculateDays = () => {
        if (startDate && endDate) {
            const diffTime = Math.abs(endDate - startDate);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
        return 0;
    };

    // Prépare les caractéristiques dynamiques
    const caracteristiques = vehicule ? [
        { icon: 'fas fa-gas-pump', label: vehicule.carburant },
        { icon: 'fas fa-cog', label: vehicule.boite },
        { icon: 'fas fa-car', label: vehicule.portes ? vehicule.portes + ' portes' : null },
        { icon: 'fas fa-users', label: vehicule.places ? vehicule.places + ' places' : null },
        { icon: 'fas fa-suitcase', label: vehicule.volume_coffre },
        { icon: 'fas fa-tachometer-alt', label: vehicule.puissance ? vehicule.puissance + ' ch' : null },
    ].filter(c => c.label) : [];

    return (
        <div className="produits-container">
            <Header />
            <div className="produits-content">
                <div className="car-details">
                    <div className="car-main-section">
                        <div className="car-image-container">
                            {vehicule && vehicule.image ? (
                                <img src={vehicule.image.startsWith('http') ? vehicule.image : `/MayRent/back/public/uploads/voitures/${vehicule.image}`} alt={vehicule.modele} className="car-image" style={{objectFit: 'cover', width: '100%', height: '100%'}} />
                            ) : (
                                <div className="car-image"></div>
                            )}
                        </div>
                        
                        <div className="booking-section">
                            <h2>Réserver votre véhicule</h2>
                            <div className="date-picker">
                                <div className="date-input">
                                    <label>Date de début</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={new Date()}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Sélectionnez une date"
                                        className="date-picker-input"
                                    />
                                </div>
                                <label>Date de fin</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={handleEndDateChange}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Sélectionnez une date"
                                    className="date-picker-input"
                                />
                            </div>
                            <div className="booking-summary">
                                <div className="summary-item">
                                    <span>Prix par jour</span>
                                    <span>{vehicule ? vehicule.prix_jour : '--'}€</span>
                                </div>
                                <div className="summary-item">
                                    <span>Nombre de jours</span>
                                    <span>{calculateDays()}</span>
                                </div>
                                <div className="summary-item total">
                                    <span>Total</span>
                                    <span>{vehicule ? calculateDays() * vehicule.prix_jour : 0}€</span>
                                </div>
                            </div>
                            <button className="rent-button">Réserver maintenant</button>
                        </div>
                    </div>
                    {vehicule ? (
                        <>
                            <h1>{vehicule.modele}</h1>
                            <div className="price-tag">{vehicule.prix_jour}€ / jour</div>
                            <div className="car-specs">
                                <h2>Caractéristiques</h2>
                                <div className="specs-grid">
                                    {caracteristiques.map((c, i) => (
                                        <div className="spec-item" key={i}>
                                            <i className={c.icon}></i>
                                            <span>{c.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="car-description">
                                <h2>Description</h2>
                                <p>{vehicule.description || 'Aucune description.'}</p>
                            </div>
                        </>
                    ) : (
                        <h1>Aucun véhicule sélectionné</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Produits; 