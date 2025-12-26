// frontend/src/services/admin.service.js
const axios = require("axios");
const BASE_URL = process.env.BACKEND_URL || "http://localhost:8000";
const { getToken } = require("./utils/token");

async function getUsuarios() {
    try {
        const token = getToken();
        const response = await axios.get(`${BASE_URL}/admin/usuarios`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.usuarios;
    } catch (err) {
        throw new Error(err.response?.data?.detail || err.message);
    }
}

async function getSolicitudes() {
    try {
        const token = getToken();
        const response = await axios.get(`${BASE_URL}/admin/solicitudes`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.solicitudes;
    } catch (err) {
        throw new Error(err.response?.data?.detail || err.message);
    }
}

async function getDecisiones() {
    try {
        const token = getToken();
        const response = await axios.get(`${BASE_URL}/admin/decisiones`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.decisiones;
    } catch (err) {
        throw new Error(err.response?.data?.detail || err.message);
    }
}

async function getFeedback() {
    try {
        const token = getToken();
        const response = await axios.get(`${BASE_URL}/admin/retroalimentacion`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.retroalimentacion;
    } catch (err) {
        throw new Error(err.response?.data?.detail || err.message);
    }
}

module.exports = {
    getUsuarios,
    getSolicitudes,
    getDecisiones,
    getFeedback
};
