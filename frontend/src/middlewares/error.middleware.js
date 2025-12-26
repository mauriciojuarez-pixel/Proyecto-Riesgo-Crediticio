function handleErrors(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.render("error", {
        error: err.message || "Ocurrió un error inesperado",
        user: req.session.user || null
    });
}

module.exports = {
    handleErrors
};
