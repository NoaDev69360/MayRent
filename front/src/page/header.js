// Dans votre composant Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Fichier CSS que nous allons créer

function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        {/* Logo à gauche */}
        <Link to="/" className="logo-link">
          <img 
            src="/logo.png" 
            alt="Location de véhicules" 
            className="logo" 
          />
        </Link>

        {/* Boutons à droite */}
        <div className="header-actions">
          <Link to="/create-ad" className="action-button create-ad">
            Créer une annonce
          </Link>
          
          <Link to="/help" className="action-button help">
            Aide
          </Link>
          
          <Link to="/login" className="login-icon">
            <img 
              src="/user-icon.png" 
              alt="Connexion" 
              className="user-icon" 
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;