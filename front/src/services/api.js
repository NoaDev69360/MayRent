// Configuration de base pour les requêtes API
export const API_URL = 'http://localhost:8080/api'; // URL de base de l'API Symfony

// Fonction utilitaire pour les requêtes fetch
const fetchApi = async (endpoint, options = {}) => {
  try {
    // Récupérer le token d'authentification
    const token = localStorage.getItem('token');
    
    // Préparer les headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    // Ajouter le token d'authentification si disponible
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
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
      // Affichage détaillé de l'erreur
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body: data
      });
      throw new Error(
        (data && data.message) ||
        (typeof data === 'string' ? data : JSON.stringify(data)) ||
        `HTTP error! status: ${response.status}`
      );
    }

    return data;
  } catch (error) {
    // Affichage détaillé de l'erreur attrapée
    console.error('API Error (catch):', error, error.stack);
    throw error;
  }
};


export const api = {
  post: (endpoint, data) => fetchApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  get: (endpoint, options = {}) => fetchApi(endpoint, options),

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
  getCars: () => fetchApi('/voitures'),
  
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