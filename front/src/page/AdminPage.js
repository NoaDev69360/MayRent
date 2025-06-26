import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Redirige vers la page de connexion si non connecté
    navigate('/connexion');
    return null;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bienvenue sur votre espace administrateur</h1>
      <p><strong>Prénom :</strong> {user.firstName}</p>
      <p><strong>Nom :</strong> {user.lastName}</p>
      <p><strong>Email :</strong> {user.email}</p>
    </div>
  );
}

export default AdminPage; 