const fetch = require("node-fetch");

const riskController = {
    renderRisk: (req, res) => {
        if (!req.session.user) {
            return res.redirect("/auth/login");
        }
        // Pasar info del usuario a la vista
        res.render("risk", { user: req.session.user, error: null });
    },

    predictRisk: async (req, res) => {
        try {
            const user = req.session.user;
            if (!user || !user.id) {
                return res.status(401).json({ error: "Usuario no identificado. Vuelve a iniciar sesión." });
            }

            const data = {
                cliente_id: user.id,  // enviar el ID real del usuario
                ingreso: parseFloat(req.body.ingreso),
                deuda_ratio: parseFloat(req.body.deuda_ratio),
                antiguedad: parseInt(req.body.antiguedad),
                estabilidad_laboral: parseInt(req.body.estabilidad_laboral)
            };

            const response = await fetch("http://localhost:8000/risk/predict_risk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const resultado = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: resultado.detail || "Error en backend" });
            }

            res.json(resultado);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error al comunicarse con el backend" });
        }
    }
};

module.exports = riskController;
