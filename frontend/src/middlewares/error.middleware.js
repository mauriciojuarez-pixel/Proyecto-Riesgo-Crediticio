// frontend/src/middlewares/error.middleware.js

function errorHandler(err, req, res, next) {
    console.error(err.stack);

    // Si los headers ya fueron enviados, delega al default handler
    if (res.headersSent) {
        return next(err);
    }

    // Renderiza la vista 'error.ejs' pasando correctamente las variables
    res.status(500).render("error", {
        message: err.message || "Error interno del servidor",
        error: err.stack || err
    });
}

module.exports = { errorHandler };
