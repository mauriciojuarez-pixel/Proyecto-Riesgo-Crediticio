// frontend/src/controllers/risk.controller.js

const riskService = require("../services/risk.services.js");

const riskController = {

    renderRisk: (req, res) => {
        if (!req.session.user) {
            return res.redirect("/auth/login");
        }

        res.render("risk", {
            user: req.session.user,
            error: null,
            resultado: null
        });
    },

    predictRisk: async (req, res) => {
        try {
            const user = req.session.user;

            if (!user || !user.id) {
                return res.status(401).json({ error: "Usuario no identificado. Inicie sesión nuevamente." });
            }

            const data = {
                cliente_id: user.id,
                ingreso: Number(req.body.ingreso),
                deuda_ratio: Number(req.body.deuda_ratio),
                antiguedad: Number(req.body.antiguedad),
                estabilidad_laboral: Number(req.body.estabilidad_laboral)
            };

            // Usar el servicio con el token de la sesión
            const resultado = await riskService.evaluarRiesgo(data, req.session.token);

            res.json(resultado);

        } catch (error) {
            console.error("Error en predictRisk:", error);
            res.status(500).json({ error: "No se pudo conectar con el motor de riesgo" });
        }
    }
};

module.exports = riskController;
