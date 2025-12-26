// frontend/src/middlewares/token.middleware.js


// Agrega token de sesión al objeto req para llamadas a backend
function attachToken(req, res, next) {
    if (req.session && req.session.token) {
        req.token = req.session.token;
    }
    next();
}

module.exports = {
    attachToken
};
