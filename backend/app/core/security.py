# backend/app/core/security.py
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt

# -------------------- CONFIGURACIÓN --------------------
SECRET_KEY = "TU_SECRET_KEY_AQUI"  # Cambiar por una variable de entorno en producción
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hora

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -------------------- HASHING --------------------
def hash_password(password: str) -> str:
    """Genera un hash seguro de la contraseña"""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica si la contraseña coincide con su hash"""
    return pwd_context.verify(plain_password, hashed_password)

# -------------------- JWT --------------------
def create_access_token(data: dict, expires_delta: timedelta = None):
    """Genera un token JWT con datos del usuario"""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    """Decodifica un token JWT"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None  # Token expirado
    except jwt.InvalidTokenError:
        return None  # Token inválido
