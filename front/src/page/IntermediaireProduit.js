import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import MapView from '../components/MapView';
import './IntermediaireProduit.css';

function IntermediaireProduit() {
    const navigate = useNavigate();
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [isMapView, setIsMapView] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8000/api/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                console.log('Catégories récupérées:', data);
            })
            .catch((err) => {
                setCategories([]);
                console.error('Erreur lors de la récupération des catégories:', err);
            });
        fetch('http://localhost:8000/api/voitures')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setVehicles(data);
                    console.log('Véhicules récupérés:', data);
                } else {
                    setVehicles([]);
                    console.error('Erreur API véhicules:', data);
                }
            })
            .catch((err) => {
                setVehicles([]);
                console.error('Erreur lors de la récupération des véhicules:', err);
            });
    }, []);

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

    const handleRentClick = (vehicule) => {
        navigate('/produits', { state: { vehicule } });
    };

    // Pour supprimer les doublons côté front
    const uniqueCategories = Array.from(new Set(categories.map(cat => cat.nom)))
        .map(nom => categories.find(cat => cat.nom === nom));

    return (
        <div className="intermediaire-container">
            <Header />
            <div className="intermediaire-content">
                <div className="filters-section">
                    <h2>Filtres</h2>
                    <div className="filter-group">
                        <h3>Catégories</h3>
                        <div className="checkbox-group">
                            {uniqueCategories.map(cat => (
                                <label key={cat.id} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedTypes.includes(cat.nom)}
                                        onChange={() => handleTypeChange(cat.nom)}
                                    />
                                    {cat.nom}
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
                        {vehicles.map((vehicule) => (
                            <div key={vehicule.id} className="product-card">
                                <div className="product-image">
                                    {vehicule.image ? (
                                        <img src={vehicule.image.startsWith('http') ? vehicule.image : `/MayRent/back/public/uploads/voitures/${vehicule.image}`} alt={vehicule.modele} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                    ) : (
                                        <div style={{width: '100%', height: '100%', background: '#eee'}}></div>
                                    )}
                                </div>
                                <div style={{padding: '8px', textAlign: 'center'}}>
                                    <strong>{vehicule.modele}</strong>
                                    <div>{vehicule.prix_jour} € / jour</div>
                                </div>
                                <button className="rent-button" onClick={() => handleRentClick(vehicule)}>Louer</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntermediaireProduit; 