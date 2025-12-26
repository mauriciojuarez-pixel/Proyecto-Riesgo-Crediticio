// frontend/src/controllers/auth.controller.js
const authService = require("../service/auth.service");

// ---------- RENDER LOGIN ----------
function renderLogin(req, res) {
    res.render("auth/login", { error: null, user: null });
}

// ---------- LOGIN ----------
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const data = await authService.login(email, password);

        // Ajuste de cookies
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 3600000
        };

        res.cookie("token", data.access_token, cookieOptions);
        res.cookie("user", JSON.stringify(data.user), cookieOptions);

        return res.redirect("/dashboard");
    } catch (err) {
        console.error("Error login:", err);
        const msg = err.detail || err.message || "Error al iniciar sesión";
        return res.render("auth/login", { error: msg, user: null });
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
        const data = await authService.register(username, email, password);

        // Registro exitoso
        return res.render("auth/register", {
            error: null,
            success: "Usuario registrado correctamente, inicia sesión",
            user: null
        });

    } catch (err) {
        console.error("Error register:", err);
        const msg = err.detail || err.message || "Error al registrarse";
        return res.render("auth/register", { error: msg, success: null, user: null });
    }
}

// ---------- LOGOUT ----------
function logout(req, res) {
    res.clearCookie("token");
    res.clearCookie("user");
    res.redirect("/auth/login");
}

module.exports = { renderLogin, renderRegister, login, register, logout };
