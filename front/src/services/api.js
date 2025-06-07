// Configuration de base pour les requêtes API
const API_URL = 'http://localhost/MayRent/back/public/api'; // URL complète de l'API

// Fonction utilitaire pour les requêtes fetch
const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      mode: 'cors',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Une erreur est survenue');
  }
};

// Exemple de fonctions pour les requêtes API
export const api = {
  // Méthode POST générique
  post: (endpoint, data) => fetchApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Méthode GET générique
  get: (endpoint) => fetchApi(endpoint),

  // Méthode PUT générique
  put: (endpoint, data) => fetchApi(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Méthode DELETE générique
  delete: (endpoint) => fetchApi(endpoint, {
    method: 'DELETE',
  }),

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