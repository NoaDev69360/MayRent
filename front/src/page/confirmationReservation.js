import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Produits.css';

function ConfirmationReservation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { client, vehicule, reservation } = location.state || {};

    if (!client || !vehicule || !reservation) {
        return (
            <div className="produits-container">
                <Header />
                <div className="produits-content">
                    <h1>Erreur : informations de réservation manquantes.</h1>
                    <button onClick={() => navigate('/')}>Retour à l'accueil</button>
                </div>
            </div>
        );
    }

    return (
        <div className="produits-container">
            <Header />
            <div className="produits-content">
                <h1 style={{textAlign: 'center', marginBottom: '2rem'}}>
                    Merci {client.prenom || client.firstName} pour la réservation de votre {vehicule.modele}
                </h1>
                <div className="car-details">
                    <div className="car-main-section">
                        <div className="car-image-container">
                            {vehicule.image ? (
                                <img src={vehicule.image.startsWith('http') ? vehicule.image : `/MayRent/back/public/uploads/voitures/${vehicule.image}`} alt={vehicule.modele} className="car-image" style={{objectFit: 'cover', width: '400px', height: '300px'}} />
                            ) : (
                                <div className="car-image"></div>
                            )}
                        </div>
                        <div className="booking-section">
                            <h2>Détails de la réservation</h2>
                            <div className="booking-summary">
                                <div className="summary-item"><span>Nom du client</span><span>{client.prenom || client.firstName} {client.nom || client.lastName}</span></div>
                                <div className="summary-item"><span>Email</span><span>{client.email}</span></div>
                                <div className="summary-item"><span>Date de début</span><span>{reservation.date_debut}</span></div>
                                <div className="summary-item"><span>Date de fin</span><span>{reservation.date_fin}</span></div>
                                <div className="summary-item"><span>Prix total</span><span>{reservation.prix_totale} €</span></div>
                                <div className="summary-item"><span>Lieu de départ</span><span>{vehicule.lieu_depart || 'Non renseigné'}</span></div>
                            </div>
                            <h2>Détails du véhicule</h2>
                            <div className="booking-summary">
                                <div className="summary-item"><span>Modèle</span><span>{vehicule.modele}</span></div>
                                <div className="summary-item"><span>Prix/jour</span><span>{vehicule.prix_jour} €</span></div>
                                <div className="summary-item"><span>Carburant</span><span>{vehicule.carburant}</span></div>
                                <div className="summary-item"><span>Boîte</span><span>{vehicule.boite}</span></div>
                                <div className="summary-item"><span>Portes</span><span>{vehicule.portes}</span></div>
                                <div className="summary-item"><span>Places</span><span>{vehicule.places}</span></div>
                                <div className="summary-item"><span>Volume coffre</span><span>{vehicule.volume_coffre}</span></div>
                                <div className="summary-item"><span>Puissance</span><span>{vehicule.puissance}</span></div>
                                <div className="summary-item"><span>Description</span><span>{vehicule.description}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationReservation; 