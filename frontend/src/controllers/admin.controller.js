// frontend/src/controllers/admin.controller.js
const adminService = require("../services/admin.service.js");

async function renderDashboard(req, res) {
    res.render("admin/dashboard");
}

async function usuarios(req, res) {
    try {
        const usuarios = await adminService.getUsuarios(req.session.token);
        res.render("admin/usuarios", { usuarios, error: null });
    } catch (err) {
        console.error("Error en usuarios:", err);
        res.render("admin/usuarios", { usuarios: [], error: err.message });
    }
}

async function solicitudes(req, res) {
    try {
        const solicitudes = await adminService.getSolicitudes(req.session.token);
        res.render("admin/solicitudes", { solicitudes, error: null });
    } catch (err) {
        console.error("Error en solicitudes:", err);
        res.render("admin/solicitudes", { solicitudes: [], error: err.message });
    }
}

async function decisiones(req, res) {
    try {
        const decisiones = await adminService.getDecisiones(req.session.token);
        res.render("admin/decisiones", { decisiones, error: null });
    } catch (err) {
        console.error("Error en decisiones:", err);
        res.render("admin/decisiones", { decisiones: [], error: err.message });
    }
}

async function retroalimentacion(req, res) {
    try {
        const feedback = await adminService.getFeedback(req.session.token);
        res.render("admin/retroalimentacion", { feedback, error: null });
    } catch (err) {
        console.error("Error en retroalimentacion:", err);
        res.render("admin/retroalimentacion", { feedback: [], error: err.message });
    }
}

// Exportamos cada función directamente para asegurar que sean funciones válidas
module.exports = {
    renderDashboard,
    usuarios,
    solicitudes,
    decisiones,
    retroalimentacion
};
