from jose import jwt, JWTError
from os import getenv
from fastapi import HTTPException, status
from prisma import Prisma
from lib.db import db
import httpx

SECRET_KEY = getenv("SECRET_JWT")

async def search_user(username : str):
    print(username)
    if username is None:
        raise HTTPException(detail="Username must been filled!",status_code=status.HTTP_400_BAD_REQUEST)
    try:
        data = await db.accounts.find_many(where={
            "OR" : [
                {"username" : {
                    "contains" : username,
                    "mode" : "insensitive"
                }},
                {"Profile": {
                    "is":{
                        "fullname" : {
                            "contains" : username,
                            "mode" : "insensitive"
                        }
                    }
                }}
            ]
        },include={
            "Profile" : True
        })

        if data is None : 
            raise HTTPException(detail="User not found!",status_code=status.HTTP_404_NOT_FOUND)

        return data
    except httpx.HTTPStatusError as error:
        HTTPException(detail=error)
        raise error
    except httpx.RequestError as error:
        HTTPException(detail=error)
        raise error

async def get_all_users(request):
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

