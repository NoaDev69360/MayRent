import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SignupForm from "./page/inscription";
import Connexion from "./page/connexion";
import Header from "./components/Header";
import FormFilterAccueil from "./components/FormFilterAccueil";
import IntermediaireProduit from "./page/IntermediaireProduit";
import SearchButton from "./components/SearchButton";
import Produits from "./page/Produits";
import AdminPage from "./page/AdminPage";
import ConfirmationReservation from './page/confirmationReservation';
import MonCompte from './page/MonCompte';
import "./App.css";
import { api } from './services/api';
import Footer from './components/Footer';

// Import des images
import img44 from "./img/img-4X42.png";
import imgCamion from "./img/img-camion-chantier.png";
import imgCitadine from "./img/img-citadine2.png";
import imgElectrique from "./img/img-electrique2.png";
import imgSportive from "./img/img-sportive2.png";
import amiVoiture from "./img/ami-voiture.jpg";
import axa from "./img/AXA.png";
import maaf from "./img/MAAF.png";
import sg from "./img/SG.png";
import trustpilot from "./img/trustpilote.png";
import logo from "./img/logomyrentwhite.png";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/connexion";
  const isHome = location.pathname === "/";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const totalSlides = 3; // Nombre total de slides
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [categoriesAccueil, setCategoriesAccueil] = useState([]);

  // Fonction pour le défilement automatique
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change de slide toutes les 5 secondes

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    api.getCars().then(data => {
      if (Array.isArray(data)) {
        setFavoriteCars(data.slice(0, 3));
      }
    }).catch(() => setFavoriteCars([]));
  }, []);

  useEffect(() => {
    api.get('/categories')
      .then(data => setCategoriesAccueil(data))
      .catch(() => setCategoriesAccueil([]));
  }, []);

  // Fonctions pour la navigation manuelle
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSearchClick = () => {
    navigate("/intermediaire-produit");
  };

  // Fonction pour choisir l'image selon le nom de la catégorie
  const getCategoryImage = (nom) => {
    if (nom.toLowerCase().includes('suv') || nom.toLowerCase().includes('4x4')) return img44;
    if (nom.toLowerCase().includes('camion')) return imgCamion;
    if (nom.toLowerCase().includes('citadine')) return imgCitadine;
    if (nom.toLowerCase().includes('électrique')) return imgElectrique;
    if (nom.toLowerCase().includes('sportive')) return imgSportive;
    // Image par défaut
    return imgCitadine;
  };

  return (
    <div className={`App${!isHome ? ' with-header-space' : ''}`}>
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<SignupForm />} />
        <Route
          path="/intermediaire-produit"
          element={<IntermediaireProduit />}
        />
        <Route path="/produits" element={<Produits />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/confirmation-reservation" element={<ConfirmationReservation />} />
        <Route path="/mon-compte" element={<MonCompte />} />
        <Route
          path="/"
          element={
            <>
              <FormFilterAccueil />
              <div className="hero-section">
                <h1>
                  Louez l'introuvable avec{" "}
                  <span className="brand-name">MayRent</span>
                </h1>
                <p>
                  Réservez sur la plateforme proposant la plus large gamme de
                  voiture
                </p>
              </div>
              <div className="car-types-section">
                <h2>Explorez par type de voiture</h2>
                <div className="car-types-grid">
                  {categoriesAccueil.map(cat => (
                    <div className="car-type-card" key={cat.id} onClick={() => navigate('/intermediaire-produit', { state: { filter: { categorie: cat.nom } } })}>
                      <img src={getCategoryImage(cat.nom)} alt={cat.nom} />
                      <span>{cat.nom}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="favorite-cars-section">
                <h2>Nos Véhicules Favoris</h2>
                <p>
                  Découvrez notre sélection de véhicules les plus populaires
                </p>
                <div className="favorite-cars-grid">
                  {favoriteCars.length > 0 ? favoriteCars.map((car) => (
                    <div className="favorite-car-card" key={car.id} style={{background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 12}}>
                      <img src={car.image_url ? car.image_url : (car.image && car.image !== 'default.jpg' ? `/MayRent/back/public/uploads/voitures/${car.image}` : '/MayRent/back/public/uploads/voitures/default.jpg')} alt={car.modele} style={{width: '100%', height: 120, objectFit: 'cover', borderRadius: 6, marginBottom: 8, background: '#f0f0f0'}} />
                      <div style={{fontWeight: 600, fontSize: 18, marginBottom: 4}}>{car.modele}</div>
                      <div style={{color: '#007bff', fontWeight: 500, marginBottom: 8}}>{car.prix_jour} € / jour</div>
                      <button className="search-button" style={{padding: '0.5rem 1.2rem', fontSize: 15}} onClick={() => navigate('/produits', { state: { vehicule: car } })}>
                        Voir ce véhicule
                      </button>
                    </div>
                  )) : (
                    <>
                      <div className="favorite-car-card"><div className="placeholder-image"></div></div>
                      <div className="favorite-car-card"><div className="placeholder-image"></div></div>
                      <div className="favorite-car-card"><div className="placeholder-image"></div></div>
                    </>
                  )}
                </div>
                <div className="favorite-cars-button">
                  <button onClick={handleSearchClick} className="search-button">
                    Tous nos véhicules
                  </button>
                </div>
              </div>
              <div className="about-section">
                <div className="about-content">
                  <div className="about-text">
                    <h2>
                      MayRent – Location de véhicules professionnels et
                      peer-to-peer
                    </h2>
                    <p>
                      Chez MayRent, nous proposons une solution complète de
                      location de véhicules pour les professionnels et les
                      particuliers. Notre flotte s'étend des citadines
                      économiques aux camions de chantier, en passant par les
                      utilitaires et véhicules spécialisés.
                    </p>

                    <h3>Notre différence ?</h3>

                    <p>
                      ✅ Flexibilité maximale : Si un véhicule n'est pas
                      disponible dans notre flotte (ex. : toutes nos citadines
                      sont louées), vous pouvez louer celui d'un particulier ou
                      d'un autre professionnel directement sur notre plateforme.
                    </p>

                    <p>✅ Revenus supplémentaires pour les propriétaires :</p>
                    <ul>
                      <li>
                        Vous avez un véhicule inutilisé ? Louez-le via MayRent
                        et gagnez de l'argent.
                      </li>
                      <li>
                        Nous prenons simplement un pourcentage sur la location,
                        sans frais cachés.
                      </li>
                      <li>
                        Seule condition : Apposer un autocollant magnétique
                        MayRent (retirable sans trace) pendant la durée de la
                        location.
                      </li>
                    </ul>

                    <p>✅ Sécurité & Confiance :</p>
                    <ul>
                      <li>
                        Vérification des documents (permis, assurance) pour
                        chaque locataire.
                      </li>
                      <li>
                        Assurance incluse pour les locations entre particuliers
                        (option selon formule).
                      </li>
                    </ul>

                    <h3>Pourquoi choisir MayRent ?</h3>
                    <p>
                      🔹 Pour les locataires : Accès à une large gamme de
                      véhicules, même quand notre flotte est saturée.
                    </p>
                    <p>
                      🔹 Pour les propriétaires : Monétisez votre véhicule quand
                      vous ne l'utilisez pas.
                    </p>

                    <p className="join-text">
                      Rejoignez la communauté MayRent – Louez, partagez,
                      économisez !
                    </p>
                  </div>
                  <div className="about-image">
                    <img src={amiVoiture} alt="Ami voiture" />
                  </div>
                </div>
              </div>
              <div className="partners-section">
                <h2>Louer en toute sécurité avec nos partenaires</h2>
                <div className="partners-grid">
                  <div className="partner-logo">
                    <img src={axa} alt="AXA" />
                  </div>
                  <div className="partner-logo">
                    <img src={maaf} alt="MAAF" />
                  </div>
                  <div className="partner-logo">
                    <img src={sg} alt="Société Générale" />
                  </div>
                  <div className="partner-logo">
                    <img src={trustpilot} alt="Trustpilot" />
                  </div>
                </div>
              </div>
              <div className="faq-section">
                <h2>Questions Fréquentes</h2>
                <div className="faq-container">
                  <div className="faq-category">
                    <h3>📍 Pour les Locataires</h3>
                    <div className="faq-item">
                      <button
                        className={`faq-question ${
                          activeFaq === 0 ? "active" : ""
                        }`}
                        onClick={() => toggleFaq(0)}
                      >
                        Comment réserver un véhicule ?
                        <span className="faq-icon">+</span>
                      </button>
                      <div
                        className={`faq-answer ${
                          activeFaq === 0 ? "active" : ""
                        }`}
                      >
                        <p>
                          Créez un compte, vérifiez votre identité (pièce
                          d'identité + permis).
                        </p>
                        <p>
                          Choisissez entre nos véhicules MayRent ou ceux de
                          particuliers/pros vérifiés (identifiés par un
                          autocollant magnétique).
                        </p>
                      </div>
                    </div>
                    <div className="faq-item">
                      <button
                        className={`faq-question ${
                          activeFaq === 1 ? "active" : ""
                        }`}
                        onClick={() => toggleFaq(1)}
                      >
                        Que faire si votre flotte est complète ?
                        <span className="faq-icon">+</span>
                      </button>
                      <div
                        className={`faq-answer ${
                          activeFaq === 1 ? "active" : ""
                        }`}
                      >
                        <p>
                          Nous vous proposons des véhicules de particuliers ou
                          professionnels partenaires, tous contrôlés (assurance,
                          carte grise, état technique).
                        </p>
                      </div>
                    </div>
                    <div className="faq-item">
                      <button
                        className={`faq-question ${
                          activeFaq === 2 ? "active" : ""
                        }`}
                        onClick={() => toggleFaq(2)}
                      >
                        Quels documents fournir ?
                        <span className="faq-icon">+</span>
                      </button>
                      <div
                        className={`faq-answer ${
                          activeFaq === 2 ? "active" : ""
                        }`}
                      >
                        <ul>
                          <li>Pièce d'identité</li>
                          <li>Permis de conduire</li>
                          <li>Carte bancaire (dépôt de garantie)</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="faq-category">
                    <h3>🚗 Pour les Propriétaires Particuliers</h3>
                    <div className="faq-item">
                      <button
                        className={`faq-question ${
                          activeFaq === 3 ? "active" : ""
                        }`}
                        onClick={() => toggleFaq(3)}
                      >
                        Comment louer mon véhicule ?
                        <span className="faq-icon">+</span>
                      </button>
                      <div
                        className={`faq-answer ${
                          activeFaq === 3 ? "active" : ""
                        }`}
                      >
                        <p>Inscription + vérification d'identité.</p>
                        <p>Upload des documents :</p>
                        <ul>
                          <li>Carte grise à votre nom</li>
                          <li>
                            Assurance couvrant la location entre particuliers
                          </li>
                        </ul>
                        <p>
                          Validation sous 72h → Envoi de l'autocollant
                          magnétique MayRent (obligatoire).
                        </p>
                      </div>
                    </div>
                    <div className="faq-item">
                      <button
                        className={`faq-question ${
                          activeFaq === 4 ? "active" : ""
                        }`}
                        onClick={() => toggleFaq(4)}
                      >
                        Suis-je assuré pendant la location ?
                        <span className="faq-icon">+</span>
                      </button>
                      <div
                        className={`faq-answer ${
                          activeFaq === 4 ? "active" : ""
                        }`}
                      >
                        <p>
                          Oui, si votre assurance le permet. Sinon, nous
                          proposons une extension via notre partenaire (option
                          payante).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="faq-category">
                    <h3>🏢 Pour les Professionnels</h3>
                    <div className="faq-item">
                      <button
                        className={`faq-question ${
                          activeFaq === 5 ? "active" : ""
                        }`}
                        onClick={() => toggleFaq(5)}
                      >
                        Quels documents fournir en plus ?
                        <span className="faq-icon">+</span>
                      </button>
                      <div
                        className={`faq-answer ${
                          activeFaq === 5 ? "active" : ""
                        }`}
                      >
                        <ul>
                          <li>KBIS (moins de 3 mois)</li>
                          <li>Attestation de vigilance (si applicable)</li>
                          <li>
                            Assurance professionnelle couvrant la location
                          </li>
                          <li>Carte grise au nom de l'entreprise</li>
                        </ul>
                      </div>
                    </div>
                    <div className="faq-item">
                      <button
                        className={`faq-question ${
                          activeFaq === 6 ? "active" : ""
                        }`}
                        onClick={() => toggleFaq(6)}
                      >
                        Combien de temps pour valider un dossier pro ?
                        <span className="faq-icon">+</span>
                      </button>
                      <div
                        className={`faq-answer ${
                          activeFaq === 6 ? "active" : ""
                        }`}
                      >
                        <p>
                          96h maximum (vs 72h pour les particuliers) pour
                          vérifier les documents d'entreprise.
                        </p>
                      </div>
                    </div>
                    <div className="faq-item">
                      <button
                        className={`faq-question ${
                          activeFaq === 7 ? "active" : ""
                        }`}
                        onClick={() => toggleFaq(7)}
                      >
                        Puis-je louer toute ma flotte ?
                        <span className="faq-icon">+</span>
                      </button>
                      <div
                        className={`faq-answer ${
                          activeFaq === 7 ? "active" : ""
                        }`}
                      >
                        <p>
                          Oui ! Contactez-nous pour un forfait entreprise
                          (gestion centralisée, tarifs dégressifs).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="faq-category">
                    <h3>⚖️ Règles Communes</h3>
                    <div className="faq-item">
                      <button
                        className={`faq-question ${
                          activeFaq === 8 ? "active" : ""
                        }`}
                        onClick={() => toggleFaq(8)}
                      >
                        Que se passe-t-il en cas d'accident ?
                        <span className="faq-icon">+</span>
                      </button>
                      <div
                        className={`faq-answer ${
                          activeFaq === 8 ? "active" : ""
                        }`}
                      >
                        <p>Le locataire déclare l'incident via l'appli.</p>
                        <p>
                          Franchise à sa charge si responsable (montant variable
                          selon le véhicule).
                        </p>
                      </div>
                    </div>
                    <div className="faq-item">
                      <button
                        className={`faq-question ${
                          activeFaq === 9 ? "active" : ""
                        }`}
                        onClick={() => toggleFaq(9)}
                      >
                        Comment sont gérés les paiements ?
                        <span className="faq-icon">+</span>
                      </button>
                      <div
                        className={`faq-answer ${
                          activeFaq === 9 ? "active" : ""
                        }`}
                      >
                        <ul>
                          <li>
                            Pour les propriétaires : Paiement mensuel (85% du
                            montant, frais MayRent déduits).
                          </li>
                          <li>
                            Pour les pros : Facturation et virement SEPA (RIB
                            requis).
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owner-section">
                <div className="owner-container">
                  <h2>
                    Vous êtes propriétaire ? Louez votre voiture en toute
                    confiance
                  </h2>
                  <div className="buttons-container">
                    <button className="create-ad-button">
                      Créer mon annonce
                    </button>
                    <button className="learn-more-button">
                      En savoir plus
                    </button>
                  </div>
                  <div className="steps-container">
                    <div className="step">
                      <span className="step-number">01</span>
                      <span className="step-arrow">↑</span>
                      <h3>Créez votre annonce</h3>
                      <p>
                        Disponibilité, tarification, photos… vous restez aux
                        commandes !
                      </p>
                    </div>
                    <div className="step">
                      <span className="step-number">02</span>
                      <span className="step-arrow">↑</span>
                      <h3>Recevez votre étiquette</h3>
                      <p>
                        Une fois votre dossier analysé recevez votre étiquette
                        et rentabilisez votre véhicule
                      </p>
                    </div>
                    <div className="step">
                      <span className="step-number">03</span>
                      <span className="step-arrow">↑</span>
                      <h3>Le départ est imminent</h3>
                      <p>
                        Confiez les clés à vos locataires et rentabilisez votre
                        véhicule
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <main className="main-content"></main>
            </>
          }
        />
      </Routes>
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
