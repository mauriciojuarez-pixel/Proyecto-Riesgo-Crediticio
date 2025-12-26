// frontend/app.js
const express = require("express");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

// -------------------- App --------------------
const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- Middlewares --------------------
const { ensureAuth } = require("./src/middlewares/auth.middleware.js");

// -------------------- Routers --------------------
const authRoutes = require("./src/routes/auth.routes.js");
const riskRoutes = require("./src/routes/risk.routes.js");
const adminRoutes = require("./src/routes/admin.routes.js");

// -------------------- Configuración --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// EJS
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");

// -------------------- Sesiones --------------------
app.use(session({
    name: "risk.sid",
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 4
    }
}));

// -------------------- Routers --------------------
app.use("/auth", authRoutes);
app.use("/risk", riskRoutes);
app.use("/admin", adminRoutes);

// -------------------- Rutas --------------------
app.get("/", (req, res) => {
    res.redirect("/auth/login");
});

app.get("/dashboard", ensureAuth, (req, res) => {
    res.render("dashboard", { user: req.session.user });
});

// -------------------- Manejo de errores --------------------
const { errorHandler } = require("./src/middlewares/error.middleware.js");
app.use(errorHandler);

// -------------------- Servidor --------------------
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Frontend activo en puerto ${PORT}`);
});
