# backend/app/core/schemas.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# -------------------- USUARIOS --------------------
class UsuarioCreate(BaseModel):
    nombre: str = Field(..., example="Juan Pérez")
    email: EmailStr = Field(..., example="juan@example.com")
    password: str = Field(..., min_length=6)

class UsuarioLogin(BaseModel):
    email: EmailStr = Field(..., example="juan@example.com")
    password: str = Field(..., min_length=6)

class UsuarioResponse(BaseModel):
    id: str
    nombre: str
    email: EmailStr

# -------------------- SOLICITUD DE RIESGO --------------------
class SolicitudCliente(BaseModel):
    ingreso: float = Field(..., example=2500.0)
    deuda_ratio: float = Field(..., example=0.2)
    antiguedad: int = Field(..., example=5)
    estabilidad_laboral: int = Field(..., ge=0, le=10, example=7)

# -------------------- DECISIÓN --------------------
class DecisionRiesgo(BaseModel):
    riesgo_final: float
    recomendacion: str = Field(..., example="Aprobar")
    motivo: Optional[str] = None
