import React from 'react';
import { useNavigate } from 'react-router-dom';

function SearchButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/intermediaire-produit');
    };

    return (
        <button className="search-button" onClick={handleClick}>
            Rechercher une voiture
        </button>
    );
}

export default SearchButton; 