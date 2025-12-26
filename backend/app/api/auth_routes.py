# backend/app/api/auth_routes.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field
from ..core.security import hash_password, verify_password, create_access_token
from ..database import crud
from datetime import datetime, timedelta
from typing import Annotated

router = APIRouter(prefix="/auth", tags=["Autenticación"])

# -------------------- CONSTANTES --------------------
MAX_BCRYPT_PASSWORD_LENGTH = 72  # Bcrypt no acepta más de 72 bytes

# -------------------- ESQUEMAS --------------------

class RegistroUsuario(BaseModel):
    username: Annotated[str, Field(min_length=3, max_length=50)]
    email: EmailStr
    password: Annotated[str, Field(min_length=6, max_length=MAX_BCRYPT_PASSWORD_LENGTH)]

class LoginUsuario(BaseModel):
    email: EmailStr
    password: str

# -------------------- RUTAS --------------------

@router.post("/register")
def register(user: RegistroUsuario):
    """
    Registro de un nuevo usuario. Guarda la información en la colección Usuarios.
    """
    if crud.get_user_by_email(user.email):
        raise HTTPException(status_code=400, detail="Usuario ya existe")

    # Cortar la contraseña si excede el límite de bcrypt
    password_to_hash = user.password[:MAX_BCRYPT_PASSWORD_LENGTH]
    hashed_pwd = hash_password(password_to_hash)

    user_doc = {
        "username": user.username,
        "email": user.email,
        "password_hash": hashed_pwd,
        "rol": "cliente",
        "created_at": datetime.utcnow(),
        "ultimo_login": None
    }

    user_id = crud.insert_user(user_doc)
    
    return {
        "message": "Usuario registrado correctamente",
        "user_id": str(user_id)
    }

@router.post("/login")
def login(user: LoginUsuario):
    """
    Login de usuario. Devuelve un token JWT y actualiza último login.
    """
    db_user = crud.get_user_by_email(user.email)
    
    if not db_user or not verify_password(user.password[:MAX_BCRYPT_PASSWORD_LENGTH], db_user["password_hash"]):
        raise HTTPException(status_code=401, detail="Credenciales inválidas")

    crud.update_user_login(str(db_user["_id"]))

    token = create_access_token(
        data={
            "user_id": str(db_user["_id"]),
            "email": db_user["email"],
            "rol": db_user["rol"]
        },
        expires_delta=timedelta(hours=1)
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "user_id": str(db_user["_id"]),
            "username": db_user["username"],
            "email": db_user["email"],
            "rol": db_user["rol"]
        }
    }
