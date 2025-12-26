const adminService = require("../services/admin.service.js");

// Renderiza la página de usuarios
async function renderUsuarios(req, res) {
    if (!req.session.user) return res.redirect("/auth/login");

    const usuarios = await adminService.obtenerUsuarios(req.session.token);
    res.render("admin/usuarios", { user: req.session.user, usuarios, error: null });
}

// Renderiza solicitudes
async function renderSolicitudes(req, res) {
    if (!req.session.user) return res.redirect("/auth/login");

    const solicitudes = await adminService.obtenerSolicitudes(req.session.token);
    res.render("admin/solicitudes", { user: req.session.user, solicitudes, error: null });
}

// Renderiza decisiones
async function renderDecisiones(req, res) {
    if (!req.session.user) return res.redirect("/auth/login");

    const decisiones = await adminService.obtenerDecisiones(req.session.token);
    res.render("admin/decisiones", { user: req.session.user, decisiones, error: null });
}

// Renderiza retroalimentación
async function renderRetroalimentacion(req, res) {
    if (!req.session.user) return res.redirect("/auth/login");

    const retro = await adminService.obtenerRetroalimentacion(req.session.token);
    res.render("admin/retroalimentacion", { user: req.session.user, retro, error: null });
}

module.exports = {
    renderUsuarios,
    renderSolicitudes,
    renderDecisiones,
    renderRetroalimentacion
};
