// frontend/src/controllers/auth.controller.js
const authService = require("../services/auth.services.js"); // corregido a plural services

const authController = {
  // Renderiza la página de registro
  renderRegister: (req, res) => {
    res.render("register", { error: null, resultado: null });
  },

  // Procesa el registro
  register: async (req, res) => {
    try {
      const resultado = await authService.register(req.body);

      // Opcional: iniciar sesión automáticamente después del registro
      req.session.user = {
        id: resultado.user_id,
        nombre: req.body.username,
        rol: "cliente",
        email: req.body.email
      };

      // Redirigir al dashboard directamente
      res.redirect("/dashboard");
    } catch (err) {
      console.error("Error en register:", err);
      res.render("register", {
        error: err.response?.data?.detail || err.message || "Error en el registro",
        resultado: null
      });
    }
  },

  // Renderiza la página de login
  renderLogin: (req, res) => {
    if (req.session.user) {
      return res.redirect("/dashboard"); // si ya está logueado, enviar al dashboard
    }
    res.render("login", { error: null });
  },

  // Procesa el login
  login: async (req, res) => {
    try {
      const userData = await authService.login(req.body);

      if (!userData || !userData.user || !userData.access_token) {
        throw new Error("Respuesta inválida del servidor. Intente nuevamente.");
      }

      // Guardar user completo en la sesión
      req.session.user = {
        id: userData.user.user_id,
        nombre: userData.user.username,
        rol: userData.user.rol,
        email: userData.user.email
      };
      req.session.token = userData.access_token;

      // Redirigir al dashboard
      res.redirect("/dashboard");
    } catch (err) {
      console.error("Error en login:", err);
      res.render("login", {
        error: err.response?.data?.detail || err.message || "Usuario o contraseña incorrecta"
      });
    }
  },

  // Cerrar sesión
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) console.error("Error destruyendo sesión:", err);
      res.redirect("/auth/login");
    });
  },
};

module.exports = authController;
