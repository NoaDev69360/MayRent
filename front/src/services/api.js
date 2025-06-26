// Configuration de base pour les requêtes API
const API_URL = 'http://localhost:8000/api'; // URL de base de l'API Symfony

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
      credentials: 'omit', // On n'envoie pas de cookies pour l'instant
    });

    // Pour les requêtes OPTIONS, on retourne directement
    if (options.method === 'OPTIONS') {
      return null;
    }

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(data.message || data || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
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