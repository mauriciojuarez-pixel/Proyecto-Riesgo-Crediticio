// frontend/src/middlewares/token.middleware.js
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.session.token;

    if (!token) {
        return res.redirect("/auth/login");
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || "TU_SECRET_KEY");
        req.user = payload;
        next();
    } catch (err) {
        console.error("Token inválido:", err.message);
        res.redirect("/auth/login");
    }
}

module.exports = {
    verifyToken,
};
