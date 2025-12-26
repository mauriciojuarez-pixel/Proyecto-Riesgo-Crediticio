const BASE_URL = "https://riesgo-backend-w5jn.onrender.com";

const riskService = {

    evaluarRiesgo: async (datos, token) => {
        const res = await fetch(`${BASE_URL}/risk/predict_risk`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify(datos)
        });

        const data = await res.json();
        if (!res.ok) throw data;
        return data;
    }

};

module.exports = riskService;
