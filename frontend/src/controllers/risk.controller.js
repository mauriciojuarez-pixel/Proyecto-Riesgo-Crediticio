// frontend/src/controllers/risk.controller.js

// frontend/src/controllers/risk.controller.js
const riskService = require("../services/risk.service.js");

function renderRisk(req, res) {
    const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;

    if (!user) return res.redirect("/auth/login");

    res.render("risk", { user, error: null, resultado: null });
}

async function predictRisk(req, res) {
    try {
        const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;
        const token = req.cookies.token;

        if (!user || !user.user_id) {
            return res.status(401).json({ error: "Usuario no identificado. Inicie sesión nuevamente." });
        }

        const datos = {
            cliente_id: user.user_id,  // usar user_id de la cookie
            ingreso: parseFloat(req.body.ingreso),
            deuda_ratio: parseFloat(req.body.deuda_ratio),
            antiguedad: parseInt(req.body.antiguedad),
            estabilidad_laboral: parseInt(req.body.estabilidad_laboral)
        };

        const resultado = await riskService.evaluarRiesgo(datos, token);

        res.json(resultado);
    } catch (error) {
        console.error("Error en predictRisk:", error);
        res.status(500).json({ error: "No se pudo conectar con el motor de riesgo" });
    }
}

module.exports = { renderRisk, predictRisk };
