const API_BASE_URL = 'http://localhost:8000/api';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export const api = {
    async post(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: defaultHeaders,
                credentials: 'include',
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async get(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: defaultHeaders,
                credentials: 'include',
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async put(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: defaultHeaders,
                credentials: 'include',
                body: JSON.stringify(data),
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    async delete(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'DELETE',
                headers: defaultHeaders,
                credentials: 'include',
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}; 