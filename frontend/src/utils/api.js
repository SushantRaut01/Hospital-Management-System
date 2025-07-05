const BASE_URL = process.env.REACT_APP_API_URL + process.env.REACT_APP_API_BASE_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "API Error");
  }

  return response.json();
};
