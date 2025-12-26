// frontend/src/controllers/admin.controller.js
const adminService = require("../services/admin.service.js");

/**
 * Renderiza el dashboard principal del admin
 */
async function renderDashboard(req, res) {
    if (!req.session.user) return res.redirect("/auth/login");

    res.render("admin/dashboard", {
        user: req.session.user
    });
}

/**
 * Renderiza la lista de usuarios
 */
async function usuarios(req, res) {
    if (!req.session.token) return res.redirect("/auth/login");

    try {
        const usuarios = await adminService.getUsuarios(req.session.token);
        res.render("admin/usuarios", { usuarios, error: null, user: req.session.user });
    } catch (err) {
        console.error("Error en usuarios:", err);
        res.render("admin/usuarios", { usuarios: [], error: err.message, user: req.session.user });
    }
}

/**
 * Renderiza la lista de solicitudes
 */
async function solicitudes(req, res) {
    if (!req.session.token) return res.redirect("/auth/login");

    try {
        const solicitudes = await adminService.getSolicitudes(req.session.token);
        res.render("admin/solicitudes", { solicitudes, error: null, user: req.session.user });
    } catch (err) {
        console.error("Error en solicitudes:", err);
        res.render("admin/solicitudes", { solicitudes: [], error: err.message, user: req.session.user });
    }
}

/**
 * Renderiza las decisiones tomadas
 */
async function decisiones(req, res) {
    if (!req.session.token) return res.redirect("/auth/login");

    try {
        const decisiones = await adminService.getDecisiones(req.session.token);
        res.render("admin/decisiones", { decisiones, error: null, user: req.session.user });
    } catch (err) {
        console.error("Error en decisiones:", err);
        res.render("admin/decisiones", { decisiones: [], error: err.message, user: req.session.user });
    }
}

/**
 * Renderiza la retroalimentación recibida
 */
async function retroalimentacion(req, res) {
    if (!req.session.token) return res.redirect("/auth/login");

    try {
        const feedback = await adminService.getFeedback(req.session.token);
        res.render("admin/retroalimentacion", { feedback, error: null, user: req.session.user });
    } catch (err) {
        console.error("Error en retroalimentacion:", err);
        res.render("admin/retroalimentacion", { feedback: [], error: err.message, user: req.session.user });
    }
}

// Exportamos funciones individualmente para evitar el error "argument handler must be a function"
module.exports = {
    renderDashboard,
    usuarios,
    solicitudes,
    decisiones,
    retroalimentacion
};
