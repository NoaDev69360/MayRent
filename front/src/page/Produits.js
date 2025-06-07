import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Header from '../components/Header';
import './Produits.css';

function Produits() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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

    return (
        <div className="produits-container">
            <Header />
            <div className="produits-content">
                <div className="car-details">
                    <div className="car-main-section">
                        <div className="car-image-container">
                            <div className="car-image"></div>
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
                                <div className="date-input">
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
                            </div>
                            <div className="booking-summary">
                                <div className="summary-item">
                                    <span>Prix par jour</span>
                                    <span>45€</span>
                                </div>
                                <div className="summary-item">
                                    <span>Nombre de jours</span>
                                    <span>{calculateDays()}</span>
                                </div>
                                <div className="summary-item total">
                                    <span>Total</span>
                                    <span>{calculateDays() * 45}€</span>
                                </div>
                            </div>
                            <button className="rent-button">Réserver maintenant</button>
                        </div>
                    </div>

                    <div className="car-info">
                        <h1>Renault Clio 5</h1>
                        <div className="price-tag">45€ / jour</div>
                        
                        <div className="car-specs">
                            <h2>Caractéristiques</h2>
                            <div className="specs-grid">
                                <div className="spec-item">
                                    <i className="fas fa-gas-pump"></i>
                                    <span>Essence</span>
                                </div>
                                <div className="spec-item">
                                    <i className="fas fa-cog"></i>
                                    <span>Manuelle</span>
                                </div>
                                <div className="spec-item">
                                    <i className="fas fa-car"></i>
                                    <span>5 portes</span>
                                </div>
                                <div className="spec-item">
                                    <i className="fas fa-users"></i>
                                    <span>5 places</span>
                                </div>
                                <div className="spec-item">
                                    <i className="fas fa-suitcase"></i>
                                    <span>350L</span>
                                </div>
                                <div className="spec-item">
                                    <i className="fas fa-tachometer-alt"></i>
                                    <span>130 ch</span>
                                </div>
                            </div>
                        </div>

                        <div className="car-description">
                            <h2>Description</h2>
                            <p>
                                La Renault Clio 5 est une citadine moderne et polyvalente, 
                                parfaite pour la ville comme pour les trajets quotidiens. 
                                Avec son design élégant et son intérieur confortable, 
                                elle offre une expérience de conduite agréable et économique.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Produits; 