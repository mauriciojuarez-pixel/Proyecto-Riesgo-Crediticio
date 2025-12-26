Proyecto_riesgo_credicitio/
│
├── backend/                         # Motor Inteligente
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth_routes.py       # Login y registro (JWT)
│   │   │   ├── risk_routes.py       # POST /predict_risk
│   │   │   └── admin_routes.py      # Reportes históricos
│   │   │
│   │   ├── core/
│   │   │   ├── security.py          # Hashing, JWT
│   │   │   └── schemas.py           # Pydantic
│   │   │
│   │   ├── database/
│   │   │   ├── db_connector.py      # MongoClient
│   │   │   └── crud.py              # insert_solicitud, insert_decision
│   │   │
│   │   ├── ml_engine/
│   │   │   ├── train_model.py       # Entrena modelo ML
│   │   │   ├── ml_model.joblib      # Modelo entrenado
│   │   │   ├── fuzzy_logic.py       # Motor Lógica Difusa
│   │   │   └── prediction_service.py# get_final_risk()
│   │   │
│   │   └── main.py                  # FastAPI app
│   │
│   ├── data/historical_data.csv
│   
frontend/
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── risk.controller.js
│   │   └── admin.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │   └── token.middleware.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── risk.routes.js
│   │   └── admin.routes.js
│   ├── services/
│   │   ├── 
│   │   │   ├── auth.service.js
│   │   │   ├── risk.service.js
│   │   │   └── admin.service.js
│   │   └── utils/
│   │       └── token.js
│   └── views/
│       ├── login.ejs
│       ├── register.ejs
│       ├── dashboard.ejs
│       ├── error.ejs
│       ├── risk.ejs
│       └── admin/
│           ├── usuarios.ejs
│           ├── solicitudes.ejs
│           ├── decisiones.ejs
│           └── retroalimentacion.ejs
├── app.js
├── package.json
├── package-lock.json
└── .env

├── requirements.txt


Usuario
  ↓
Node.js (Express, Axios, JWT desde node_modules)
  ↓
FastAPI  POST /predict_risk
  ↓
get_final_risk()
  ├─ ML → P_inc
  └─ Lógica Difusa → Riesgo_Final
  ↓
MongoDB
  ├─ solicitudes_clientes
  └─ decisiones_riesgo
  ↓
FastAPI → JSON
  ↓
Node.js → result.ejs
  ↓
Usuario
