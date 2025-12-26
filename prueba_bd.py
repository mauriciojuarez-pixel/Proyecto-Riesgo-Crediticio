from backend.app.core.security import hash_password

nuevo_hash = hash_password("test123")
print(nuevo_hash)
