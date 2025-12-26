// frontend/src/controllers/risk.controller.js


const riskService = require("../services/risk.service.js");

// Renderiza la página de evaluación de riesgo
function renderRisk(req, res) {
    let user = null;

    // Intentar obtener user desde cookie
    if (req.cookies.user) {
        try {
            user = JSON.parse(decodeURIComponent(req.cookies.user));
        } catch (err) {
            console.error("Error parseando cookie user:", err);
            user = null;
        }
    }

    if (!user) {
        return res.redirect("/auth/login");
    }

    res.render("risk", {
        user,
        error: null,
        resultado: null
    });
}

// Procesa la evaluación de riesgo
async function predictRisk(req, res) {
    try {
        let user = null;

        if (req.cookies.user) {
            try {
                user = JSON.parse(decodeURIComponent(req.cookies.user));
            } catch (err) {
                console.error("Error parseando cookie user:", err);
            }
        }

        const token = req.cookies.token;

        if (!user || !user.user_id) {
            return res.status(401).json({ error: "Usuario no identificado. Inicie sesión nuevamente." });
        }

        const datos = {
            cliente_id: user.user_id,
            ingreso: parseFloat(req.body.ingreso),
            deuda_ratio: parseFloat(req.body.deuda_ratio),
            antiguedad: parseFloat(req.body.antiguedad),
            estabilidad_laboral: parseFloat(req.body.estabilidad_laboral)
        };

        // Llamada al servicio que retorna score + fuzzy logic
        const resultado = await riskService.evaluarRiesgo(datos, token);

        res.json(resultado);

    } catch (error) {
        console.error("Error en predictRisk:", error);
        res.status(500).json({ error: "No se pudo conectar con el motor de riesgo" });
    }
}

module.exports = { renderRisk, predictRisk };
