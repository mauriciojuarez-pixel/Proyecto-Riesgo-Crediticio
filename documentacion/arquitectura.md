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
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/                        # Interfaz Web
│   ├── node_modules/               # Dependencias Node (NO se versiona)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── risk.routes.js
│   │   │
│   │   ├── views/                  # EJS
│   │   │   ├── login.ejs
│   │   │   ├── dashboard.ejs
│   │   │   └── result.ejs
│   │   │
│   │   └── public/
│   │       ├── css/styles.css
│   │       └── js/app.js
│   │
│   ├── app.js
│   ├── package.json
│   └── package-lock.json


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
