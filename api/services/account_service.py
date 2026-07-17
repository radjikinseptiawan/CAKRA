from fastapi import HTTPException, Response, status
import httpx
from lib.jwt import create_access_token
from lib.db import db
import bcrypt

async def sign_in_account(body, response: Response):
    try:
        sign_in_payload = {
            "username" : body.username,
            "password" : body.password
        }

        get_accounts = await db.accounts.find_first(where={"username": sign_in_payload["username"]},include={"Profile" : True})

        if not get_accounts:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Username atau password salah"
            )

        if not bcrypt.checkpw(
            body.password.encode("utf-8"),
            get_accounts.password.encode("utf-8")
            ):
                raise HTTPException(
                    status_code=401,
                    detail="Username atau password salah"
                )
        
        bcrypt.checkpw(sign_in_payload["password"].encode("utf-8"),get_accounts.password.encode("utf-8"))

        token = create_access_token({
            "id" : get_accounts.account_id,
            "username": get_accounts.username,
            "role" : get_accounts.Profile.role
        })
        
        response.set_cookie(
                key="access_token",
                value=token,
                httponly=True,
                max_age=86400,
                expires=86400,
                path="/",
                samesite="lax", # Nanti ini pas production diubah jadi lax, domain nya harus sama!
                secure=False
            )
        
        return {
            "message": "Success to login",
        }
    except httpx.HTTPStatusError as error:
        raise error
    except httpx.RequestError as error:
        raise error

async def create_account(body):
    try:
        hashed_password = bcrypt.hashpw(body.password.encode("utf-8"),bcrypt.gensalt()).decode("utf-8")
        payload_account = {
            "username" : body.username,
            "password":hashed_password,
        }

        account_request = await db.accounts.create(payload_account)

        payload_profile = {
            "email" : body.email,
            "fullname" : body.fullname,
            "role":body.role,
            "number_phone": body.number_phone,
            "account_id": account_request.account_id
        }

        profile_request = await db.profile.create(payload_profile)

        return {
            "message" : "success to register",
            "data":{
                "account" : account_request,
                "profile": profile_request
            }
        }
    except httpx.HTTPStatusError as error:
        print(error)
        raise error
    except httpx.RequestError as error:
        print(error)
        raise error


async def sign_out_account(response: Response):
    try:
        response.delete_cookie(
                key="access_token",
                httponly=True,
                path="/",
                samesite="lax", # Nanti ini pas production diubah jadi lax, domain nya harus sama!
                secure=False
)

        return {
            "message": "Success to logout"
        }
    except httpx.HTTPStatusError as error:
        print(error)
        raise error
    except httpx.RequestError as error:
        print(error)
        raise error
