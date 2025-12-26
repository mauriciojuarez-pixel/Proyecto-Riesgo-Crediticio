# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Routers
from .api.auth_routes import router as auth_router
from .api.risk_routes import router as risk_router
from .api.admin_routes import router as admin_router


# -------------------- Inicializar FastAPI --------------------
app = FastAPI(
    title="Sistema Inteligente de Riesgo Crediticio",
    description="API para gestión de solicitudes de crédito con ML y lógica difusa",
    version="1.0.0"
)

# -------------------- CORS --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambiar por el dominio del frontend en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Endpoint raíz --------------------
@app.get("/", tags=["Saludo"])
def root():
    return {"message": "API de Riesgo Crediticio funcionando"}

# -------------------- Routers --------------------
app.include_router(auth_router)
app.include_router(risk_router)
app.include_router(admin_router)