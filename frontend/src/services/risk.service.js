// frontend/src/service/risk.service.js
const BASE_URL = "https://riesgo-backend-w5jn.onrender.com";

const riskService = {
    evaluarRiesgo: async (datos, token) => {
        try {
            const res = await fetch(`${BASE_URL}/risk/predict`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {})
                },
                body: JSON.stringify(datos)
            });

            let data;
            try {
                data = await res.json(); // parsear JSON una sola vez
            } catch (err) {
                console.error("Error parseando JSON del backend:", err);
                throw { error: "Respuesta inválida del servidor" };
            }

            if (!res.ok) {
                throw data; // puede contener { error: "...", ... }
            }

            // Retornar estructura consistente para el frontend
            return {
                riesgo: data.riesgo || "Indefinido",
                score: data.score || "-"
            };

        } catch (err) {
            console.error("Error en riskService.evaluarRiesgo:", err);
            throw err;
        }
    }
};

module.exports = riskService;
