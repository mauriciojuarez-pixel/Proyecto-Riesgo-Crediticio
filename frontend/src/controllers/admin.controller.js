// frontend/src/controllers/admin.controller.js
const adminService = require("../services/admin.service.js");

const adminController = {
    renderDashboard: (req, res) => {
        res.render("admin/dashboard");
    },

    usuarios: async (req, res) => {
        try {
            const usuarios = await adminService.getUsuarios(req.session.token);
            res.render("admin/usuarios", { usuarios, error: null });
        } catch (err) {
            res.render("admin/usuarios", { usuarios: [], error: err.message });
        }
    },

    solicitudes: async (req, res) => {
        try {
            const solicitudes = await adminService.getSolicitudes(req.session.token);
            res.render("admin/solicitudes", { solicitudes, error: null });
        } catch (err) {
            res.render("admin/solicitudes", { solicitudes: [], error: err.message });
        }
    },

    decisiones: async (req, res) => {
        try {
            const decisiones = await adminService.getDecisiones(req.session.token);
            res.render("admin/decisiones", { decisiones, error: null });
        } catch (err) {
            res.render("admin/decisiones", { decisiones: [], error: err.message });
        }
    },

    retroalimentacion: async (req, res) => {
        try {
            const feedback = await adminService.getFeedback(req.session.token);
            res.render("admin/retroalimentacion", { feedback, error: null });
        } catch (err) {
            res.render("admin/retroalimentacion", { feedback: [], error: err.message });
        }
    },
};

module.exports = adminController;
