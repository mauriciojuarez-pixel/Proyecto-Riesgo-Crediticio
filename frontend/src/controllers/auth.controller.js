// src/controllers/auth.controller.js
const fetch = require("node-fetch");

// ---------- RENDER LOGIN ----------
function renderLogin(req, res) {
    res.render("login", { error: null, user: null });
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
            return res.render("login", { error: data.detail || "Error al iniciar sesión", user: null });
        }

        res.cookie("token", data.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.cookie("user", JSON.stringify(data.user), {
            secure: true,
            sameSite: "none"
        });


        return res.redirect("/dashboard");

    } catch (err) {
        console.error("Error login:", err);
        return res.render("login", { error: "Error de conexión con el servidor", user: null });
    }
}

// ---------- RENDER REGISTER ----------
function renderRegister(req, res) {
    res.render("register", { error: null, success: null, user: null });
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
            return res.render("register", { error: data.detail || "Error al registrarse", success: null, user: null });
        }

        return res.render("register", { error: null, success: "Registro exitoso, inicia sesión", user: null });

    } catch (err) {
        console.error("Error register:", err);
        return res.render("register", { error: "Error de conexión con el servidor", success: null, user: null });
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
