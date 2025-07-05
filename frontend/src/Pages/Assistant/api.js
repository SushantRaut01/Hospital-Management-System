const BASE_URL = process.env.REACT_APP_API_URL;
const API_PREFIX = process.env.REACT_APP_API_BASE_URL;

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${API_PREFIX}${endpoint}`;
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return await response.json();
}
