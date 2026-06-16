// Prefer explicit production configuration. If no API URL is provided,
// use a relative path so the frontend can call the backend through the same origin
// or a reverse proxy.
export const API_URL = process.env.REACT_APP_API_URL || "/api";