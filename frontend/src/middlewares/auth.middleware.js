// frontend/src/middlewares/auth.middleware.js


// Verifica que el usuario esté logueado para rutas privadas
function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect("/auth/login");
}

// Redirige a dashboard si el usuario ya está autenticado
function redirectIfAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect("/dashboard");
    }
    next();
}

// Middleware que obtiene token y usuario desde cookies
function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    const user = req.cookies.user;

    if (!token || !user) {
        return res.redirect("/auth/login");
    }

    try {
        req.token = token;
        req.user = JSON.parse(user); // Convertir JSON a objeto
        next();
    } catch (err) {
        console.error("Error parseando user cookie:", err);
        return res.redirect("/auth/login");
    }
}

// Exportar de manera individual
module.exports = {
    ensureAuthenticated,
    redirectIfAuthenticated,
    authMiddleware
};
