const express = require("express");
const session = require("express-session");
const path = require("path");
const app = express();

// Middleware de parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || "TU_SECRET_KEY",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // true si usas HTTPS
}));

// Carpeta de vistas
app.set("views", path.join(__dirname, "src/views")); // <- aquí el cambio clave
app.set("view engine", "ejs");

// Archivos estáticos
app.use(express.static(path.join(__dirname, "src/public"))); // si tienes carpeta public

// Rutas
const authRoutes = require("./src/routes/auth.routes.js");
const adminRoutes = require("./src/routes/admin.routes.js");
const riskRoutes = require("./src/routes/risk.routes.js");

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/risk", riskRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.redirect("/dashboard"); // o "/auth/login" si quieres que no logueado vaya a login
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Frontend activo en puerto ${PORT}`);
});
