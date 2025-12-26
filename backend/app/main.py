# backend/app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

from app.ml_engine.prediction_service import get_final_risk
from app.database.db_connector import solicitudes_collection, decisiones_collection

class ClienteData(BaseModel):
    ingreso: float
    deuda_ratio: float
    antiguedad: int
    estabilidad_laboral: int

app = FastAPI(title="Sistema Inteligente de Riesgo Crediticio")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "API de Riesgo Crediticio funcionando"}

@app.post("/predict_risk")
def predict_risk(cliente: ClienteData):
    try:
        # Guardar solicitud en la colección
        solicitud_doc = cliente.dict()
        solicitud_doc["fecha_solicitud"] = datetime.utcnow()
        solicitud_id = solicitudes_collection.insert_one(solicitud_doc).inserted_id

        # Obtener predicción
        resultado = get_final_risk(cliente.dict())

        # Guardar decisión
        decision_doc = {
            "_id_solicitud": solicitud_id,
            "P_inc_ML": resultado["P_inc_ML"],
            "Riesgo_Final_LF": resultado["Riesgo_Final_LF"],
            "Recomendacion": resultado["Recomendacion"],
            "fecha_decision": datetime.utcnow()
        }
        decisiones_collection.insert_one(decision_doc)

        return resultado
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
