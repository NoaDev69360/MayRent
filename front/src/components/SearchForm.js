import React from 'react';
import './SearchForm.css';

function SearchForm() {
    return (
        <div className="search-form-container">
            <h1 className="search-form-title">
                La solution idéale pour<br />
                votre location de voiture
            </h1>
            <form className="search-form">
                <div className="form-group">
                    <label htmlFor="departure">Lieu de départ</label>
                    <input
                        type="text"
                        id="departure"
                        placeholder="Entrez votre lieu de départ"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="start-date">Date de début</label>
                    <input
                        type="date"
                        id="start-date"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end-date">Date de fin</label>
                    <input
                        type="date"
                        id="end-date"
                        required
                    />
                </div>
            </form>
        </div>
    );
}

export default SearchForm; 