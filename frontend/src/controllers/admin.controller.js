const adminService = require("../services/admin.service");

// ================= USUARIOS =================
async function getUsuarios(req, res) {
    try {
        const token = req.session.token;
        const usuarios = await adminService.getUsuarios(token);
        res.render("admin/usuarios", { usuarios, user: req.session.user });
    } catch (error) {
        console.error("Error getUsuarios:", error);
        res.render("admin/usuarios", { usuarios: [], error: "No se pudieron cargar usuarios", user: req.session.user });
    }
}

// ================= SOLICITUDES =================
async function getSolicitudes(req, res) {
    try {
        const token = req.token;;
        const solicitudes = await adminService.getSolicitudes(token);
        res.render("admin/solicitudes", { solicitudes, user: req.session.user });
    } catch (error) {
        console.error("Error getSolicitudes:", error);
        res.render("admin/solicitudes", { solicitudes: [], error: "No se pudieron cargar solicitudes", user: req.session.user });
    }
}

// ================= ACTUALIZAR DECISIÓN =================
async function updateDecision(req, res) {
    try {
        const token = req.session.token;
        const { id } = req.params;
        const { decision } = req.body;

        await adminService.actualizarDecision(id, decision, token);
        res.redirect("/admin/solicitudes");
    } catch (error) {
        console.error("Error updateDecision:", error);
        res.redirect("/admin/solicitudes");
    }
}

module.exports = {
    getUsuarios,
    getSolicitudes,
    updateDecision
};
