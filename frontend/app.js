// frontend/app.js
// Archivo principal del frontend en Node.js + Express

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// -------------------- Importar rutas --------------------
// frontend/src/routes/auth.routes.js
const { router: authRoutes } = require('./src/routes/auth.routes'); 
// frontend/src/routes/risk.routes.js
const riskRoutes = require('./src/routes/risk.routes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- Configuración de vistas --------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// -------------------- Archivos estáticos --------------------
// frontend/src/public/
app.use(express.static(path.join(__dirname, 'src/public')));

// -------------------- Middleware --------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// -------------------- Rutas --------------------
app.use('/', authRoutes);     // Login, register, dashboard
app.use('/risk', riskRoutes); // Predicción de riesgo

// -------------------- Ruta raíz --------------------
app.get('/', (req, res) => res.redirect('/')); // Redirige al login (login está en '/')

// -------------------- Manejo de rutas no encontradas --------------------
app.use((req, res) => {
    res.status(404).render('404', { url: req.originalUrl });
});

// -------------------- Iniciar servidor --------------------
app.listen(PORT, () => console.log(`Frontend corriendo en http://localhost:${PORT}`));
