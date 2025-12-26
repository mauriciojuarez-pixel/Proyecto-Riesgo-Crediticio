// frontend/src/controllers/auth.controller.js

const fetch = require("node-fetch");

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const response = await fetch("https://riesgo-backend-w5jn.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.render("auth/login", { error: data.detail || "Error al iniciar sesión" });
        }

        // Guardar user y token en sesión del frontend
        req.session.user = data.user;
        req.session.token = data.access_token;

        return res.redirect("/dashboard");

    } catch (err) {
        console.error(err);
        return res.render("auth/login", { error: "Error de conexión con el servidor" });
    }
}

module.exports = { login };
