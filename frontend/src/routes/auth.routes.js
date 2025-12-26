// frontend/src/routes/auth.routes.js
// Rutas de autenticación y dashboard
const express = require('express');
const axios = require('axios');
const router = express.Router();

// -------------------- Sesión temporal --------------------
// Guardamos token y usuario en memoria mientras dure la sesión del servidor
const sessionData = { token: null, user: null };

// -------------------- Vistas --------------------
router.get('/', (req, res) => res.render('login', { error: null }));           // Login
router.get('/register', (req, res) => res.render('register', { error: null })); // Registro
router.get('/dashboard', (req, res) => {
    if (!sessionData.token) return res.redirect('/');
    res.render('dashboard', { user: sessionData.user });
});

// -------------------- Procesar login --------------------
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await axios.post('http://localhost:8000/auth/login', { email, password });

        // Guardar token y usuario
        sessionData.token = response.data.access_token;
        sessionData.user = response.data.user;

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.render('login', { error: 'Credenciales incorrectas' });
    }
});

// -------------------- Procesar registro --------------------
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await axios.post('http://localhost:8000/auth/register', { username, email, password });

        // Redirigir a login luego de registrarse
        res.redirect('/');
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.render('register', { error: 'No se pudo registrar. Intenta de nuevo.' });
    }
});

// -------------------- Cerrar sesión --------------------
router.get('/logout', (req, res) => {
    sessionData.token = null;
    sessionData.user = null;
    res.redirect('/');
});

// -------------------- Exportar --------------------
module.exports = { router, sessionData };
