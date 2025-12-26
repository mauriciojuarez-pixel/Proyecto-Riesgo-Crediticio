# backend/app/api/admin_routes.py
from fastapi import APIRouter, HTTPException
from bson import ObjectId
from datetime import datetime
from ..database.db_connector import (
    usuarios_collection,
    solicitudes_collection,
    decisiones_collection,
    retroalimentacion_collection
)
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/admin", tags=["Administración"])

# -------------------- Esquemas para POST --------------------
class UsuarioCreate(BaseModel):
    username: str
    email: EmailStr
    password_hash: str
    rol: str = "cliente"

class SolicitudCreate(BaseModel):
    usuario_id: str
    monto_solicitado: float
    plazo_meses: int
    ingresos_mensuales: float
    gastos_mensuales: float
    deudas_activas: int

class DecisionCreate(BaseModel):
    solicitud_id: str
    P_inc_ML: float
    Riesgo_Final_LF: str
    Recomendacion: str

class FeedbackCreate(BaseModel):
    usuario_id: str
    decision_id: str
    comentario: str
    fecha: datetime = datetime.utcnow()

# -------------------- GET --------------------
@router.get("/usuarios")
def listar_usuarios():
    usuarios = list(usuarios_collection.find({}, {"password_hash": 0}))
    for u in usuarios:
        u["_id"] = str(u["_id"])
    return {"usuarios": usuarios}

@router.get("/solicitudes")
def listar_solicitudes():
    solicitudes = list(solicitudes_collection.find())
    for s in solicitudes:
        s["_id"] = str(s["_id"])
        s["usuario_id"] = str(s["usuario_id"])
    return {"solicitudes": solicitudes}

@router.get("/decisiones")
def listar_decisiones():
    decisiones = list(decisiones_collection.find())
    for d in decisiones:
        d["_id"] = str(d["_id"])
        d["solicitud_id"] = str(d["solicitud_id"])
    return {"decisiones": decisiones}

@router.get("/retroalimentacion")
def listar_retroalimentacion():
    feedback = list(retroalimentacion_collection.find())
    for f in feedback:
        f["_id"] = str(f["_id"])
        f["usuario_id"] = str(f["usuario_id"])
        if "decision_id" in f:
            f["decision_id"] = str(f["decision_id"])
    return {"retroalimentacion": feedback}

@router.get("/usuario/{usuario_id}/solicitudes")
def solicitudes_por_usuario(usuario_id: str):
    solicitudes = list(solicitudes_collection.find({"usuario_id": ObjectId(usuario_id)}))
    for s in solicitudes:
        s["_id"] = str(s["_id"])
        s["usuario_id"] = str(s["usuario_id"])
    return {"solicitudes": solicitudes}

@router.get("/solicitud/{solicitud_id}/decision")
def decision_por_solicitud(solicitud_id: str):
    decision = decisiones_collection.find_one({"solicitud_id": ObjectId(solicitud_id)})
    if not decision:
        raise HTTPException(status_code=404, detail="Decisión no encontrada")
    decision["_id"] = str(decision["_id"])
    decision["solicitud_id"] = str(decision["solicitud_id"])
    return decision

@router.get("/decision/{decision_id}/retroalimentacion")
def retroalimentacion_por_decision(decision_id: str):
    feedback = list(retroalimentacion_collection.find({"decision_id": ObjectId(decision_id)}))
    for f in feedback:
        f["_id"] = str(f["_id"])
        f["usuario_id"] = str(f["usuario_id"])
        f["decision_id"] = str(f["decision_id"])
    return {"retroalimentacion": feedback}

# -------------------- POST --------------------
@router.post("/usuarios")
def crear_usuario(usuario: UsuarioCreate):
    if usuarios_collection.find_one({"email": usuario.email}):
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    usuario_dict = usuario.dict()
    usuario_dict["created_at"] = datetime.utcnow()
    usuario_dict["ultimo_login"] = None
    result = usuarios_collection.insert_one(usuario_dict)
    return {"user_id": str(result.inserted_id), **usuario_dict}

@router.post("/solicitudes")
def crear_solicitud(solicitud: SolicitudCreate):
    solicitud_dict = solicitud.dict()
    solicitud_dict["created_at"] = datetime.utcnow()
    result = solicitudes_collection.insert_one({
        **solicitud_dict,
        "usuario_id": ObjectId(solicitud.usuario_id)
    })
    return {"solicitud_id": str(result.inserted_id), **solicitud_dict}

@router.post("/decisiones")
def crear_decision(decision: DecisionCreate):
    decision_dict = decision.dict()
    decision_dict["created_at"] = datetime.utcnow()
    result = decisiones_collection.insert_one({
        **decision_dict,
        "solicitud_id": ObjectId(decision.solicitud_id)
    })
    return {"decision_id": str(result.inserted_id), **decision_dict}

@router.post("/retroalimentacion")
def crear_retroalimentacion(feedback: FeedbackCreate):
    feedback_dict = feedback.dict()
    feedback_dict["fecha"] = datetime.utcnow()
    result = retroalimentacion_collection.insert_one({
        **feedback_dict,
        "usuario_id": ObjectId(feedback.usuario_id),
        "decision_id": ObjectId(feedback.decision_id)
    })
    return {"feedback_id": str(result.inserted_id), **feedback_dict}
