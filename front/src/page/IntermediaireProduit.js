import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import MapView from '../components/MapView';
import './IntermediaireProduit.css';
import { api } from '../services/api';

function IntermediaireProduit() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [isMapView, setIsMapView] = useState(false);
    const [hasInitialFilter, setHasInitialFilter] = useState(false);

    useEffect(() => {
        api.get('/categories')
            .then(data => {
                setCategories(data);
                console.log('Catégories récupérées:', data);
            })
            .catch((err) => {
                setCategories([]);
                console.error('Erreur lors de la récupération des catégories:', err);
            });
        api.get('/voitures')
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

    useEffect(() => {
        // Au chargement, si une catégorie est passée, on l'ajoute aux filtres
        const filter = location.state?.filter;
        if (filter?.categorie && !selectedTypes.includes(filter.categorie)) {
            setSelectedTypes(prev => [...prev, filter.categorie]);
        }
    }, [location.state]);

    useEffect(() => {
        let result = [...vehicles];
        const filter = location.state?.filter;

        // LOGS DEBUG
        console.log('--- DEBUG FILTRAGE ---');
        console.log('Catégories des véhicules:', vehicles.map(v => v.categorie ? v.categorie.nom : null));
        console.log('selectedTypes:', selectedTypes);
        console.log('filter.categorie:', filter?.categorie);
        // FIN LOGS DEBUG

        // 1. Filtre par lieu de départ
        if (filter?.departure) {
            result = result.filter(v => v.lieu_depart && v.lieu_depart.toLowerCase().includes(filter.departure.toLowerCase()));
        }

        // 2. Filtre par catégorie
        if (selectedTypes.length > 0) {
            result = result.filter(v => v.categorie && selectedTypes.includes(v.categorie.nom));
            if (hasInitialFilter) setHasInitialFilter(false); // On désactive le filtre initial après interaction
        } else if (filter?.categorie && !hasInitialFilter) {
            result = result.filter(v => v.categorie && v.categorie.nom === filter.categorie);
            setHasInitialFilter(true);
        }
        // Sinon, aucun filtre de catégorie => tout afficher

        setFilteredVehicles(result);
    }, [vehicles, selectedTypes, location.state, hasInitialFilter]);

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
                </div>

                <div className="products-section">
                    <div className="products-header">
                        <h1>Nos Produits</h1>
                        {/* <button className="maps-button" onClick={toggleView}>
                            <i className={`fas fa-${isMapView ? 'list' : 'map-marker-alt'}`}></i>
                            {isMapView ? 'Voir la liste' : 'Voir sur la carte'}
                        </button> */}
                    </div>
                    <div className="products-grid">
                        {filteredVehicles.map((vehicule) => (
                            <div key={vehicule.id} className="product-card">
                                <div className="product-image">
                                    <img
                                        src={
                                            vehicule.image_url
                                                ? vehicule.image_url
                                                : (vehicule.image
                                                    ? (vehicule.image.startsWith('http')
                                                        ? vehicule.image
                                                        : `http://localhost:8080/uploads/voitures/${vehicule.image}`
                                                    )
                                                    : '/MayRent/back/public/uploads/voitures/default.jpg'
                                                )
                                        }
                                        alt={vehicule.modele || vehicule.name}
                                    />
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