const axios = require("axios");
const { getToken } = require("./utils/token");

// Detecta entorno automáticamente
const API_URL = process.env.API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" }
});

function authHeader() {
    const token = getToken();
    if (!token) throw new Error("Token no encontrado");
    return { Authorization: `Bearer ${token}` };
}

async function getUsuarios() {
    try {
        const res = await api.get("/admin/usuarios", { headers: authHeader() });
        return res.data.usuarios;
    } catch (err) {
        console.error("Error obteniendo usuarios:", err.response?.data || err.message);
        throw new Error(err.response?.data?.detail || "No se pudo cargar usuarios");
    }
}

async function getSolicitudes() {
    try {
        const res = await api.get("/admin/solicitudes", { headers: authHeader() });
        return res.data.solicitudes;
    } catch (err) {
        console.error("Error obteniendo solicitudes:", err.response?.data || err.message);
        throw new Error(err.response?.data?.detail || "No se pudo cargar solicitudes");
    }
}

async function getDecisiones() {
    try {
        const res = await api.get("/admin/decisiones", { headers: authHeader() });
        return res.data.decisiones;
    } catch (err) {
        console.error("Error obteniendo decisiones:", err.response?.data || err.message);
        throw new Error(err.response?.data?.detail || "No se pudo cargar decisiones");
    }
}

async function getFeedback() {
    try {
        const res = await api.get("/admin/retroalimentacion", { headers: authHeader() });
        return res.data.retroalimentacion;
    } catch (err) {
        console.error("Error obteniendo feedback:", err.response?.data || err.message);
        throw new Error(err.response?.data?.detail || "No se pudo cargar retroalimentación");
    }
}

module.exports = {
    getUsuarios,
    getSolicitudes,
    getDecisiones,
    getFeedback
};
