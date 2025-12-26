// frontend/src/controllers/auth.controller.js
const fetch = require("node-fetch");

// -------------------- LOGIN --------------------
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
            // Renderiza login con error
            return res.render("login", { error: data.detail || "Error al iniciar sesión" });
        }

        // Guardar usuario y token en sesión del frontend
        req.session.user = data.user;
        req.session.token = data.access_token;

        // Redirigir al dashboard
        return res.redirect("/dashboard");

    } catch (err) {
        console.error("Error login:", err);
        return res.render("login", { error: "Error de conexión con el servidor" });
    }
}

// -------------------- LOGOUT --------------------
function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.redirect("/dashboard");
        }
        res.clearCookie("connect.sid"); // Limpiar cookie de sesión
        res.redirect("/login");
    });
}

// -------------------- REGISTER --------------------
// -------------------- REGISTER --------------------
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
            // Si hubo error en el backend, mostrarlo en la vista
            return res.render("auth/register", { error: data.detail || "Error al registrarse", resultado: null });
        }

        // Registro exitoso: enviamos la info al frontend en "resultado"
        return res.render("auth/register", {
            error: null,
            resultado: {
                user_id: data.user.id || data.user._id,
                nombre: data.user.username,
                email: data.user.email
            }
        });

    } catch (err) {
        console.error("Error register:", err);
        return res.render("auth/register", { error: "Error de conexión con el servidor", resultado: null });
    }
}

// -------------------- EXPORT --------------------
module.exports = {
    login,
    logout,
    register
};
