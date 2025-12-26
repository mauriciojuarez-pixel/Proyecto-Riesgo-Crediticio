// frontend/src/routes/risk.routes.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // Para hacer requests al backend

// GET /risk/form - Mostrar formulario de solicitud de riesgo
router.get('/form', (req, res) => {
    res.render('risk_form'); // Renderiza src/views/risk_form.ejs
});

// POST /risk/predict - Enviar solicitud al backend y mostrar resultado
router.post('/predict', async (req, res) => {
    try {
        const body = {
            ingreso: parseFloat(req.body.ingreso),
            deuda_ratio: parseFloat(req.body.deuda_ratio),
            antiguedad: parseInt(req.body.antiguedad),
            estabilidad_laboral: parseInt(req.body.estabilidad_laboral)
        };

        // Token JWT (puede estar en session, aquí se coloca ejemplo fijo)
        const token = req.body.token; 

        const response = await fetch('http://localhost:8000/risk/predict_risk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const result = await response.json();
        res.render('result', result); // Renderiza resultado en result.ejs
    } catch (error) {
        console.error(error);
        res.send('Error al procesar la solicitud');
    }
});

module.exports = router;
