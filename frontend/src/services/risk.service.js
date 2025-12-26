// frontend/src/services/risk.services.js

const axios = require("axios");

// Detecta entorno automáticamente
const API_URL = process.env.API_URL || "http://localhost:8000";

async function evaluarRiesgo(datos, tokenFromSession = null) {
    try {
        // Si el token no se pasa desde el frontend, se asumirá que el backend ya tiene la sesión
        const res = await axios.post(`${API_URL}/risk/predict_risk`, datos, {
            headers: {
                Authorization: tokenFromSession ? `Bearer ${tokenFromSession}` : undefined,
                "Content-Type": "application/json"
            },
            timeout: 10000
        });

        return res.data;

    } catch (err) {
        console.error("Error al evaluar riesgo:", err.response?.data || err.message);
        throw new Error(err.response?.data?.detail || "No se pudo evaluar el riesgo crediticio");
    }
}

module.exports = {
    evaluarRiesgo
};
