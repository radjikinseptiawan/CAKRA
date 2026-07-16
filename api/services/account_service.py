from fastapi import HTTPException
import httpx
from lib.jwt import create_access_token
from lib.db import db
import bcrypt

async def sign_in_account(body):
    try:
        sign_in_payload = {
            "username" : body.username,
            "password" : body.password
        }

        get_accounts = await db.accounts.find_first(where={"username": sign_in_payload["username"]})

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
            "username": get_accounts.username
        })

        return {
            "message": "Success to login",
            "access_token": token

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
