const axios = require("axios");

// Detecta entorno automáticamente
const API_URL = process.env.API_URL || "http://localhost:8000";

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" }
});

// Ahora recibimos el token como parámetro
function authHeader(token) {
    if (!token) throw new Error("Token no encontrado en sesión");
    return { Authorization: `Bearer ${token}` };
}

async function getUsuarios(token) {
    try {
        const res = await api.get("/admin/usuarios", { headers: authHeader(token) });
        return res.data.usuarios;
    } catch (err) {
        console.error("Error obteniendo usuarios:", err.response?.data || err.message);
        throw new Error(err.response?.data?.detail || "No se pudo cargar usuarios");
    }
}

async function getSolicitudes(token) {
    try {
        const res = await api.get("/admin/solicitudes", { headers: authHeader(token) });
        return res.data.solicitudes;
    } catch (err) {
        console.error("Error obteniendo solicitudes:", err.response?.data || err.message);
        throw new Error(err.response?.data?.detail || "No se pudo cargar solicitudes");
    }
}

async function getDecisiones(token) {
    try {
        const res = await api.get("/admin/decisiones", { headers: authHeader(token) });
        return res.data.decisiones;
    } catch (err) {
        console.error("Error obteniendo decisiones:", err.response?.data || err.message);
        throw new Error(err.response?.data?.detail || "No se pudo cargar decisiones");
    }
}

async function getFeedback(token) {
    try {
        const res = await api.get("/admin/retroalimentacion", { headers: authHeader(token) });
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
