import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MapView from '../components/MapView';
import './IntermediaireProduit.css';

function IntermediaireProduit() {
    const navigate = useNavigate();
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [isMapView, setIsMapView] = useState(false);

    // Données de test pour les véhicules
    const vehicles = [
        {
            id: 1,
            name: "Renault Clio",
            description: "Citadine économique",
            price: 45,
            location: { lat: 48.8566, lng: 2.3522 }
        },
        {
            id: 2,
            name: "Peugeot 3008",
            description: "SUV confortable",
            price: 65,
            location: { lat: 48.8606, lng: 2.3376 }
        },
        // Ajoutez d'autres véhicules ici
    ];

    const brands = [
        'MyRent', 'Renault', 'Peugeot', 'Citroën', 'Volkswagen', 'BMW', 
        'Mercedes', 'Audi', 'Toyota', 'Ford', 'Fiat'
    ];

    const vehicleTypes = [
        'MyRent', 'Citadine', 'Berline', 'SUV', '4x4', 'Sportive', 
        'Utilitaire', 'Camion', 'Électrique'
    ];

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) 
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleTypeChange = (type) => {
        setSelectedTypes(prev => 
            prev.includes(type) 
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handlePriceChange = (e) => {
        setPriceRange([0, parseInt(e.target.value)]);
    };

    const toggleView = () => {
        setIsMapView(!isMapView);
    };

    const handleRentClick = () => {
        navigate('/produits');
    };

    return (
        <div className="intermediaire-container">
            <Header />
            <div className="intermediaire-content">
                <div className="filters-section">
                    <h2>Filtres</h2>
                    
                    <div className="filter-group">
                        <h3>Marques</h3>
                        <div className="checkbox-group">
                            {brands.map(brand => (
                                <label key={brand} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => handleBrandChange(brand)}
                                    />
                                    {brand}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3>Prix par jour</h3>
                        <div className="price-range">
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange[1]}
                                onChange={handlePriceChange}
                                className="price-slider"
                            />
                            <div className="price-values">
                                <span>0€</span>
                                <span>{priceRange[1]}€</span>
                            </div>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3>Type de véhicule</h3>
                        <div className="checkbox-group">
                            {vehicleTypes.map(type => (
                                <label key={type} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedTypes.includes(type)}
                                        onChange={() => handleTypeChange(type)}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="products-section">
                    <div className="products-header">
                        <h1>Nos Produits</h1>
                        <button className="maps-button" onClick={toggleView}>
                            <i className={`fas fa-${isMapView ? 'list' : 'map-marker-alt'}`}></i>
                            {isMapView ? 'Voir la liste' : 'Voir sur la carte'}
                        </button>
                    </div>
                    <div className="products-grid">
                        {[...Array(18)].map((_, index) => (
                            <div key={index} className="product-card">
                                <div className="product-image"></div>
                                <button className="rent-button" onClick={handleRentClick}>Louer</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntermediaireProduit; 