// frontend/src/controllers/auth.controller.js
// frontend/src/controllers/auth.controller.js
const authService = require("../services/auth.service.js");

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
            maxAge: 3600000 // 1 hora
        };

        res.cookie("token", data.access_token, cookieOptions);
        res.cookie("user", JSON.stringify(data.user), cookieOptions);

        return res.redirect("/dashboard");
    } catch (err) {
        console.error("Error login:", err);
        const msg = (err.detail && typeof err.detail === "string") ? err.detail :
                    (err.message ? err.message : "Error al iniciar sesión");
        return res.render("auth/login", { error: msg, user: null });
    }
}

// ---------- RENDER REGISTER ----------
function renderRegister(req, res) {
    res.render("auth/register", {
        error: null,
        success: null,
        user: null,
        prevUsername: "",
        prevEmail: ""
    });
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
            user: null,
            prevUsername: "",
            prevEmail: ""
        });

    } catch (err) {
        console.error("Error register:", err);

        let msg = "Error al registrarse";

        // Manejar errores de FastAPI (array de validaciones o string)
        if (err.detail) {
            if (Array.isArray(err.detail)) {
                msg = err.detail.map(e => {
                    const campo = (e.loc && e.loc.length > 1) ? e.loc[1] : "campo";
                    return `${campo}: ${e.msg}`;
                }).join(", ");
            } else if (typeof err.detail === "string") {
                msg = err.detail;
            }
        } else if (err.message) {
            msg = err.message;
        }

        // Devolver datos previos para que el usuario no tenga que reescribirlos
        return res.render("auth/register", {
            error: msg,
            success: null,
            user: null,
            prevUsername: username || "",
            prevEmail: email || ""
        });
    }
}

// ---------- LOGOUT ----------
function logout(req, res) {
    res.clearCookie("token");
    res.clearCookie("user");
    res.redirect("/auth/login");
}

module.exports = { renderLogin, renderRegister, login, register, logout };
