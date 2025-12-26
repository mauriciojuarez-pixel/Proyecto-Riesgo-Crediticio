const BASE_URL = "https://riesgo-backend-w5jn.onrender.com";

const authService = {

    login: async (email, password) => {
        const res = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) throw data;
        return data;
    },

    register: async (username, email, password) => {
        const res = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        if (!res.ok) throw data;
        return data;
    },

    logout: async (token) => {
        // En este caso, opcional si backend maneja logout
        return true;
    }
};

module.exports = authService;
