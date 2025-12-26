# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

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
    allow_origins=["*"],  # En producción, poner el dominio del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- Routers --------------------
app.include_router(auth_router)
app.include_router(risk_router)
app.include_router(admin_router)

# -------------------- Servir frontend estático --------------------
frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../frontend/build"))
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
