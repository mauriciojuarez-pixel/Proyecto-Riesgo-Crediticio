# backend/app/api/risk_routes.py
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from datetime import datetime
from ..ml_engine.prediction_service import get_final_risk
from ..database import crud
from ..core.security import decode_access_token

router = APIRouter(prefix="/risk", tags=["Riesgo"])

# Esquema de solicitud
class SolicitudRequest(BaseModel):
    cliente_id: str
    ingreso: float
    deuda_ratio: float
    antiguedad: int
    estabilidad_laboral: int


# Dependencia para obtener usuario desde JWT
def get_current_user(token: str):
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Token inválido o expirado")
    return payload

# Endpoint de predicción de riesgo
@router.post("/predict_risk")
def predict_risk(solicitud: SolicitudRequest):
    try:
        usuario_id = solicitud.cliente_id  # usamos el ID del body

        # Guardar solicitud en la colección
        solicitud_data = solicitud.dict()
        solicitud_id = crud.insert_solicitud(usuario_id, solicitud_data)

        # Obtener predicción del motor inteligente
        resultado = get_final_risk(solicitud.dict())

        # Guardar decisión en la colección DecisionesRiesgo
        decision_data = {
            "P_inc_ML": resultado["P_inc_ML"],
            "Riesgo_Final_LF": resultado["Riesgo_Final_LF"],
            "Recomendacion": resultado["Recomendacion"]
        }
        crud.insert_decision(solicitud_id, decision_data)

        # Retornar resultado final al cliente
        return {
            "solicitud_id": solicitud_id,
            **resultado
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

