from fastapi import HTTPException
from prisma import Prisma
from lib.db import db
import httpx

async def get_all_users():
    try:
        allUsers = await db.accounts.find_many(include={'Profile' : True})

        return allUsers
    except httpx.HTTPError as error:
        HTTPException(detail=error)
        raise error
    except httpx.RequestError as error:
        HTTPException(detail=error)
        raise error
