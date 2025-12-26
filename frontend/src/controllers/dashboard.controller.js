// frontend/src/controllers/dashboard.controller.js

function renderDashboard(req, res) {
    const user = req.user; // viene del auth.middleware

    if (!user) {
        return res.redirect("/auth/login");
    }

    res.render("dashboard", { user });
}

module.exports = { renderDashboard };
