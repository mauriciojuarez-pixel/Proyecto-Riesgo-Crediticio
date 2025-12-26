// src/services/risk.service.js
const axios = require('axios');

async function evaluarRiesgo(datos, token) {
    try {
        const res = await axios.post('http://localhost:8000/risk/predict_risk', datos, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    } catch (err) {
        console.error("Error al evaluar riesgo:", err.response?.data || err.message);
        throw new Error("Error al evaluar el riesgo");
    }
}

module.exports = {
    evaluarRiesgo
};
