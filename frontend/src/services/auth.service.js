// frontend/src/services/auth.service.js
const axios = require("axios");

const API_BASE = process.env.BACKEND_URL || "http://localhost:8000"; // tu FastAPI

async function register(data) {
    try {
        const response = await axios.post(`${API_BASE}/auth/register`, data);
        // Suponiendo que el backend devuelve { user_id, nombre, email }
        return response.data;
    } catch (err) {
        // Mostrar mensaje de error del backend
        throw new Error(err.response?.data?.detail || "Error en el registro");
    }
}

async function login(data) {
    try {
        const response = await axios.post(`${API_BASE}/auth/login`, data);
        return response.data; // { access_token, user }
    } catch (err) {
        throw new Error(err.response?.data?.detail || "Usuario o contraseña incorrecta");
    }
}

module.exports = {
    register,
    login,
};
