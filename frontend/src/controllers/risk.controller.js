const fetch = require("node-fetch");

const API_URL = process.env.API_URL || "http://localhost:8000";

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

            const response = await fetch(`${API_URL}/risk/predict_risk`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${req.session.token}`
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("Backend error:", result);
                return res.status(response.status).json({
                    error: result.detail || "Error procesando la evaluación de riesgo"
                });
            }

            res.json(result);

        } catch (error) {
            console.error("Error en predictRisk:", error);
            res.status(500).json({ error: "No se pudo conectar con el motor de riesgo" });
        }
    }
};

module.exports = riskController;
