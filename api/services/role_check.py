import jwt
from os import getenv


SECRET_KEY = getenv("SECRET_JWT")

def get_role(request):
    cookie = request.cookies.get("access_token")
    data = jwt.decode(key=SECRET_KEY,jwt=cookie,algorithms=["HS256"])
    role = data["role"]

    return role