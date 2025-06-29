import React from 'react';
import logo from '../img/logomyrentwhite.png';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>À propos</h4>
          <ul>
            <li>
              <a href="/about">Qui sommes-nous</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>
              <a href="/rent">Location de voiture</a>
            </li>
            <li>
              <a href="/insurance">Assurance</a>
            </li>
          </ul>
        </div>
        <div className="footer-logo">
          <img src={logo} alt="MayRent Logo" />
        </div>
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="/help">Centre d'aide</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            <li>
              <a href="/safety">Sécurité</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Légal</h4>
          <ul>
            <li>
              <a href="/terms">Conditions générales</a>
            </li>
            <li>
              <a href="/privacy">Politique de confidentialité</a>
            </li>
            <li>
              <a href="/cookies">Politique des cookies</a>
            </li>
            <li>
              <a href="/legal">Mentions légales</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MayRent. Tous droits réservés.</p>
      </div>
    </footer>
  );
} 