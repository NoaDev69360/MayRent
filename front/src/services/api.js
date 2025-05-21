// Configuration de base pour les requêtes API
const API_URL = 'http://localhost:3001/api'; // Remplacez par votre URL d'API

// Fonction utilitaire pour les requêtes fetch
const fetchApi = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Exemple de fonctions pour les requêtes API
export const api = {
  // Récupérer la liste des voitures
  getCars: () => fetchApi('/cars'),
  
  // Récupérer une voiture par ID
  getCarById: (id) => fetchApi(`/cars/${id}`),
  
  // Créer une nouvelle voiture
  createCar: (carData) => fetchApi('/cars', {
    method: 'POST',
    body: JSON.stringify(carData),
  }),
  
  // Mettre à jour une voiture
  updateCar: (id, carData) => fetchApi(`/cars/${id}`, {
    method: 'PUT',
    body: JSON.stringify(carData),
  }),
  
  // Supprimer une voiture
  deleteCar: (id) => fetchApi(`/cars/${id}`, {
    method: 'DELETE',
  }),
}; 