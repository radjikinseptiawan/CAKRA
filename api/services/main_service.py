from jose import jwt, JWTError
from os import getenv
from fastapi import HTTPException, status
from prisma import Prisma
from lib.db import db
import httpx

SECRET_KEY = getenv("SECRET_JWT")

async def get_all_users():
    try:
        allUsers = await db.accounts.find_many(include={'Profile' : True})

        print(allUsers)
        return allUsers
    except httpx.HTTPError as error:
        HTTPException(detail=error)
        raise error
    except httpx.RequestError as error:
        HTTPException(detail=error)
        raise error

async def update_selected_users(id,body, request):
    print(SECRET_KEY)
    try:
        cookie = request.cookies.get("access_token")

        if cookie is None : 
            raise HTTPException(detail="Cookie not found!",status_code=status.HTTP_404_NOT_FOUND)
        
        payload = jwt.decode(
            token=cookie,
            key=SECRET_KEY,
            algorithms=["HS256"]
        )

        role = payload["role"]
        if role != "OWNER":
            raise HTTPException(detail="Access denied",status_code=status.HTTP_403_FORBIDDEN)
        
        user = await db.accounts.find_first(where={"account_id" : id}, include={"Profile" : True})
        await db.profile.update(data={
            "role" : body.role
        },where={"account_id" : user.account_id})
        return user
    except httpx.HTTPError as error:
        HTTPException(detail=error)
        raise error
    except httpx.RequestError as error:
        HTTPException(detail=error)
        raise error

