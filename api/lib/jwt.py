import jwt
from datetime import datetime, timedelta, timezone
from os import getenv

SECRET_KEY = getenv("SECRET_JWT")
ALGORITMA = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTE = 60

def create_access_token(data: dict):
    payload = data.copy()

    expire  = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTE)

    payload.update({
        "exp": expire
    })

    token = jwt.encode(payload,key=SECRET_KEY,algorithm=ALGORITMA)
    return token
