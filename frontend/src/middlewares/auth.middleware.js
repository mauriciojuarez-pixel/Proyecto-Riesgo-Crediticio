// frontend/src/middlewares/auth.middleware.js

/**
 * Middleware para rutas protegidas: asegura que el usuario esté logueado
 */
function ensureAuth(req, res, next) {
    if (req.session?.user) return next();
    res.redirect("/auth/login");
}

/**
 * Middleware opcional para APIs u otras rutas que necesitan sesión
 */
function ensureSession(req, res, next) {
    if (req.session?.user) return next();
    res.status(401).json({ error: "Usuario no autenticado. Inicie sesión." });
}

/**
 * Middleware para login/register: evita que un usuario logueado acceda
 */
function redirectIfAuthenticated(req, res, next) {
    if (req.session?.user) return res.redirect("/dashboard");
    next();
}

module.exports = { ensureAuth, ensureSession, redirectIfAuthenticated };
