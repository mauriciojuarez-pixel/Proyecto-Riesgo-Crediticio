// frontend/src/controllers/auth.controller.js
const fetch = require("node-fetch");

// ---------- RENDER LOGIN ----------
function renderLogin(req, res) {
    res.render("auth/login", { error: null, user: null });
}

// ---------- LOGIN ----------
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
        let msg = "Error al iniciar sesión";
        try {
            const errData = await response.json();
            if (errData.detail) msg = errData.detail;
            else if (errData.errors) msg = errData.errors.map(e => e.msg).join(", ");
        } catch (e) {
            console.error("Error parseando response:", e);
        }
        return res.render("auth/login", { error: msg, user: null });
    }

        // Ajuste de cookies
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true solo en prod HTTPS
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 3600000 // 1 hora
        };

        res.cookie("token", data.access_token, cookieOptions);
        res.cookie("user", JSON.stringify(data.user), cookieOptions);

        return res.redirect("/dashboard");

    } catch (err) {
        console.error("Error login:", err);
        return res.render("auth/login", { error: "Error de conexión con el servidor", user: null });
    }
}

// ---------- RENDER REGISTER ----------
function renderRegister(req, res) {
    res.render("auth/register", { error: null, success: null, user: null });
}

// ---------- REGISTER ----------
async function register(req, res) {
    const { username, email, password } = req.body;

    try {
        const response = await fetch("https://riesgo-backend-w5jn.onrender.com/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            let msg = "Error al registrarse";
            try {
                const errData = await response.json();
                if (errData.detail) msg = errData.detail;
                else if (errData.errors) msg = errData.errors.map(e => e.msg).join(", ");
            } catch (e) {
                console.error("Error parseando response:", e);
            }
            return res.render("auth/register", { error: msg, user: null });
        }

        return res.render("auth/register", { error: null, success: "Registro exitoso, inicia sesión", user: null });

    } catch (err) {
        console.error("Error register:", err);
        return res.render("auth/register", { error: "Error de conexión con el servidor", success: null, user: null });
    }
}

// ---------- LOGOUT ----------
function logout(req, res) {
    res.clearCookie("token");
    res.clearCookie("user");
    res.redirect("/auth/login");
}

module.exports = {
    renderLogin,
    renderRegister,
    login,
    register,
    logout
};
