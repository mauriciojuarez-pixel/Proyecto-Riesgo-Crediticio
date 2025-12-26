const axios = require("axios");

// Detecta entorno automáticamente
const API_URL = process.env.API_URL || "http://localhost:8000";

async function register(data) {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, data, {
            headers: { "Content-Type": "application/json" },
            timeout: 10000
        });
        return response.data;
    } catch (err) {
        console.error("Error en registro:", err.response?.data || err.message);
        throw new Error(err.response?.data?.detail || "Error en el registro");
    }
}

async function login(data) {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, data, {
            headers: { "Content-Type": "application/json" },
            timeout: 10000
        });
        return response.data;
    } catch (err) {
        console.error("Error en login:", err.response?.data || err.message);
        throw new Error(err.response?.data?.detail || "Usuario o contraseña incorrecta");
    }
}

module.exports = {
    register,
    login,
};
