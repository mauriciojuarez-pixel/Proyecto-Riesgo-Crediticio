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

function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/auth/login");
    }

    req.token = token;
    req.user = req.cookies.user ? JSON.parse(req.cookies.user) : null;
    next();
}



module.exports = {
    ensureAuthenticated,
    redirectIfAuthenticated,
    authMiddleware
};
