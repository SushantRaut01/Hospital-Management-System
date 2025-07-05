const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return response.json();
}
