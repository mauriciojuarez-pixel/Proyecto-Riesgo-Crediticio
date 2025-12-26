const cliente = {
    ingreso: 3000,
    deuda_ratio: 0.2,
    antiguedad: 5,
    estabilidad_laboral: 7
};

fetch('http://127.0.0.1:8000/predict_risk', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
})
.then(res => res.json())
.then(data => console.log("Resultado:", data))
.catch(err => console.error(err));
