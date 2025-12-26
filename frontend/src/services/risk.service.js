const axios = require("axios");

// Detecta entorno automáticamente
const API_URL = process.env.API_URL || "http://localhost:8000";

async function evaluarRiesgo(datos, token) {
    try {
        const res = await axios.post(`${API_URL}/risk/predict_risk`, datos, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            timeout: 10000
        });

        return res.data;

    } catch (err) {
        console.error("Error al evaluar riesgo:", err.response?.data || err.message);
        throw new Error("No se pudo evaluar el riesgo crediticio");
    }
}

module.exports = {
    evaluarRiesgo
};
