# backend/app/database/crud.py
from .db_connector import (
    usuarios_collection,
    solicitudes_collection,
    decisiones_collection,
    retroalimentacion_collection,
    objectid_to_str
)
from bson.objectid import ObjectId
from datetime import datetime

# -------------------- USUARIOS --------------------
def insert_user(user_data: dict):
    """Inserta un usuario en la colección Usuarios"""
    try:
        result = usuarios_collection.insert_one(user_data)
        return result.inserted_id
    except Exception as e:
        print("Error insertando usuario:", e)
        raise e

def get_user_by_email(email: str):
    """Obtiene un usuario por su email"""
    return usuarios_collection.find_one({"email": email})
def get_user_by_username(username: str):
    return usuarios_collection.find_one({"username": username})

def update_user_login(user_id: str, fecha: datetime = None):
    """Actualiza el último login de un usuario"""
    fecha_actual = fecha or datetime.utcnow()
    usuarios_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"ultimo_login": fecha_actual}}
    )

# -------------------- SOLICITUDES CLIENTES --------------------
def insert_solicitud(usuario_id: str, solicitud_data: dict) -> str:
    """Inserta una solicitud de crédito y retorna el _id"""
    solicitud_data["usuario_id"] = ObjectId(usuario_id)
    solicitud_data["fecha"] = datetime.utcnow()
    result = solicitudes_collection.insert_one(solicitud_data)
    return str(result.inserted_id)

def get_solicitudes_by_user(usuario_id: str):
    """Obtiene todas las solicitudes de un usuario"""
    solicitudes = solicitudes_collection.find({"usuario_id": ObjectId(usuario_id)})
    return [objectid_to_str(s) for s in solicitudes]

# -------------------- DECISIONES RIESGO --------------------
def insert_decision(solicitud_id: str, decision_data: dict):
    """Inserta una decisión de riesgo"""
    decision_data["solicitud_id"] = ObjectId(solicitud_id)
    decision_data["fecha"] = datetime.utcnow()
    decisiones_collection.insert_one(decision_data)

def get_decisiones_by_solicitud(solicitud_id: str):
    """Obtiene la decisión de una solicitud"""
    decision = decisiones_collection.find_one({"solicitud_id": ObjectId(solicitud_id)})
    return objectid_to_str(decision) if decision else None

def get_all_decisiones():
    """Obtiene todas las decisiones"""
    decisiones = decisiones_collection.find()
    return [objectid_to_str(d) for d in decisiones]

# -------------------- RETROALIMENTACION --------------------
def insert_feedback(usuario_id: str, feedback_data: dict):
    """Inserta un comentario o retroalimentación"""
    feedback_data["usuario_id"] = ObjectId(usuario_id)
    feedback_data["fecha"] = datetime.utcnow()
    retroalimentacion_collection.insert_one(feedback_data)

def get_feedback_by_user(usuario_id: str):
    """Obtiene todos los comentarios de un usuario"""
    feedbacks = retroalimentacion_collection.find({"usuario_id": ObjectId(usuario_id)})
    return [objectid_to_str(f) for f in feedbacks]

def get_feedback_by_decision(decision_id: str):
    """Obtiene feedbacks relacionados a una decisión"""
    feedbacks = retroalimentacion_collection.find({"decision_id": ObjectId(decision_id)})
    return [objectid_to_str(f) for f in feedbacks]
