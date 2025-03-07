const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("API_BASE_URL is not defined. Please check your .env file.");
}

export default API_BASE_URL;
