const BASE_URL = "https://riesgo-backend-w5jn.onrender.com";

const adminService = {

    getUsuarios: async (token) => {
        const res = await fetch(`${BASE_URL}/admin/usuarios`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
        });

        const data = await res.json();
        if (!res.ok) throw data;
        return data;
    },

    getSolicitudes: async (token) => {
        const res = await fetch(`${BASE_URL}/admin/solicitudes`, {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
        });

        const data = await res.json();
        if (!res.ok) throw data;
        return data;
    },

    actualizarDecision: async (id, decision, token) => {
        const res = await fetch(`${BASE_URL}/admin/decisiones/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            },
            body: JSON.stringify({ decision })
        });

        const data = await res.json();
        if (!res.ok) throw data;
        return data;
    }

};

module.exports = adminService;
