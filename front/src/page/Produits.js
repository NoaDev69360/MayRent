import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Header from '../components/Header';
import './Produits.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';

function Produits() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [reservedPeriods, setReservedPeriods] = useState([]);
    const location = useLocation();
    const vehicule = location.state?.vehicule;
    const navigate = useNavigate();

    // Récupère l'ID du client connecté depuis le localStorage (à adapter selon ton système d'auth)
    let clientId = null;
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        clientId = user && user.id ? user.id : null;
    } catch (e) {}

    useEffect(() => {
        if (vehicule && vehicule.id) {
            api.get(`/voiture/${vehicule.id}/reservations`)
                .then(data => {
                    if (Array.isArray(data)) {
                        setReservedPeriods(data);
                    } else {
                        setReservedPeriods([]);
                    }
                })
                .catch(() => setReservedPeriods([]));
        }
    }, [vehicule]);

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

    // Log pour debug
    console.log('reservedPeriods', reservedPeriods);

    // Fonction pour convertir les dates au format Date JS
    const getIntervals = () => {
        if (!Array.isArray(reservedPeriods)) return [];
        return reservedPeriods.map(period => ({
            start: new Date(period.date_debut),
            end: new Date(period.date_fin)
        }));
    };

    // Fonction pour désactiver les dates réservées
    const isDateReserved = (date) => {
        return reservedPeriods.some(period => {
            const start = new Date(period.date_debut);
            const end = new Date(period.date_fin);
            // On compare en ignorant l'heure
            return date >= start && date <= end;
        });
    };

    const handleReservation = async () => {
        if (!startDate || !endDate || !vehicule) return;

        try {
            const res = await api.post('/reserver', {
                voiture_id: vehicule.id,
                date_debut: startDate.toISOString().slice(0, 10),
                date_fin: endDate.toISOString().slice(0, 10),
                prix_totale: calculateDays() * vehicule.prix_jour,
                lieu_depart: vehicule.lieu_depart || null
            });

            // Si succès, tu peux passer les infos à la page de confirmation
            navigate('/confirmation-reservation', {
                state: {
                    client: JSON.parse(localStorage.getItem('user')),
                    vehicule,
                    reservation: {
                        date_debut: startDate.toISOString().slice(0, 10),
                        date_fin: endDate.toISOString().slice(0, 10),
                        prix_totale: calculateDays() * vehicule.prix_jour
                    }
                }
            });
        } catch (error) {
            alert("Erreur lors de la réservation : " + (error.message || "inconnue"));
        }
    };

    return (
        <div className="produits-container">
            <Header />
            <div className="produits-content">
                <div className="car-details">
                    <div className="car-main-section">
                        <div className="car-image-container">
                            {vehicule && (vehicule.image_url || vehicule.image) ? (
                                <img
                                    src={vehicule.image_url ? vehicule.image_url : (vehicule.image && vehicule.image.startsWith('http') ? vehicule.image : (vehicule.image && vehicule.image !== 'default.jpg' ? `/MayRent/back/public/uploads/voitures/${vehicule.image}` : '/MayRent/back/public/uploads/voitures/default.jpg'))}
                                    alt={vehicule.modele}
                                    className="car-image"
                                    style={{objectFit: 'cover', width: '100%', height: '100%'}}
                                />
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
                                        excludeDateIntervals={getIntervals()}
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
                                    excludeDateIntervals={getIntervals()}
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
                                <div className="summary-item">
                                    <span>Lieu de départ</span>
                                    <span>{vehicule && vehicule.lieu_depart ? vehicule.lieu_depart : 'Non renseigné'}</span>
                                </div>
                            </div>
                            <button className="rent-button" onClick={handleReservation}>Réserver maintenant</button>
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