// frontend/src/middlewares/auth.middleware.js

/**
 * Middleware para rutas protegidas: asegura que el usuario esté logueado
 */
function ensureAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect("/auth/login");
}

/**
 * Middleware opcional para APIs u otras rutas: asegura que haya un token
 */
function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.token) {
        return next();
    }
    res.redirect("/auth/login");
}

/**
 * Middleware para login/register: evita que un usuario logueado acceda
 */
function redirectIfAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect("/dashboard");
    }
    next();
}

module.exports = {
    ensureAuth,             // Para vistas protegidas (dashboard, risk, admin)
    ensureAuthenticated,    // Para APIs que usan token
    redirectIfAuthenticated // Para login/register
};
