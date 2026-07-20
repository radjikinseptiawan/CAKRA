from typing import Optional
from os import getenv
import asyncio
from jose import jwt
from lib.db import db
from datetime import timezone, datetime
from fastapi import HTTPException, status, Request
import httpx

SECRET_KEY = getenv("SECRET_JWT")

# Mengambil semua camera CCTV
import math
from typing import Dict, Any

async def limitation_camera(page: str = '1') -> Dict[str, Any]:
    async def public_count():
        return await db.ccvtv.count(where={
        "category" : "PUBLIC"
       })
        
    async def private_count():
        return await db.ccvtv.count(where={
        "category" : "PRIVATE"
    })

    public,private = await asyncio.gather(
    public_count(),
    private_count()
    )


    limit = 20
    
    offset = (int(page) - 1) * limit

    async def fetch_data():
        return await db.ccvtv.find_many(
            take=limit,   
            skip=offset   
        )
        
    async def fetch_total():
        return await db.ccvtv.count()

    data, total_data = await asyncio.gather(fetch_data(), fetch_total())

    total_page = math.ceil(total_data / limit)

    return {
        "data": data,
        "meta": {
            "current_page": int(page),
            "total_page": total_page,
            "total_data": total_data,
            "limit": limit,
            "private" : private,
            "public" : public
        }
    }



async def get_camera_service(
    page: int = 1,
    search: Optional[str] = None,
    category: Optional[str] = None,
    request: Request = None,
):
    cookie = request.cookies.get("access_token")

    if cookie is None:
        raise HTTPException(
            detail="Cookie tidak ditemukan",
            status_code=status.HTTP_401_UNAUTHORIZED
        )

    limit = 20
    offset = (int(page) - 1) * limit

    try:
        where = {}

        if category and category != "SEMUA":
            where["category"] = category

        if search:
            where["camera_name"] = {
                "contains": search,
                "mode": "insensitive"
            }

        async def public_count():
            return await db.ccvtv.count(
                where={"category": "PUBLIC"}
            )

        async def private_count():
            return await db.ccvtv.count(
                where={"category": "PRIVATE"}
            )

        async def total_count():
            return await db.ccvtv.count(where=where)

        async def fetch_data():
            return await db.ccvtv.find_many(
                where=where,
                skip=offset,
                take=limit,
                order={"cctv_id": "desc"}
            )

        public, private, total_data, data = await asyncio.gather(
            public_count(),
            private_count(),
            total_count(),
            fetch_data()
        )

        return {
            "data": data,
            "page": page,
            "limit": limit,
            "total_data": total_data,
            "total_page": (total_data + limit - 1) // limit,
            "public": public,
            "private": private,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        ) 


# Menambahkan camera CCTV baru
async def create_camera_service(body,request):
    cookie = request.cookies.get("access_token")

    if cookie is None:
        raise HTTPException(detail="Cookie tidak tersedia!", status_code=status.HTTP_404_NOT_FOUND)

    data = jwt.decode(key=SECRET_KEY, token=cookie,algorithms=["HS256"])

    role = data["role"]

    if role not in ("STAFF", "OWNER"):
        raise HTTPException(detail="Acess denied", status_code=status.HTTP_403_FORBIDDEN)
    
    try:
        camera = ''

        if body.source_url.startswith == "https":
            camera = body.source_url
            return camera

        payload = {
            "camera_name" : body.camera_name,
            "converted_url" : camera,
            "source_url" : body.source_url,
            "latitude" : body.latitude,
            "longitude" : body.longitude,
            "category" : body.category,
            "location_description" : body.location_description,
            "created_at" : datetime.now(timezone.utc)
        }

        psql = await db.ccvtv.create(data=payload)

        return {
            "message" : "Berhasil menambahkan camera",
            "data": psql
        }
    except httpx.HTTPStatusError as error:
        print(error)
        raise HTTPException(detail=error)
    except httpx.RequestError as error:
        print(error)
        raise HTTPException(detail=error)

# Melihat detail dari data camera CCTV 
async def get_camera_detail(id):
    try:
        psql = await db.ccvtv.find_first(where={"cctv_id" : id})

        if psql is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Kamera dengan kode {id} tidak ditemukan!"
            )

        return psql
    except httpx.HTTPStatusError as http_error:
        raise http_error
    except httpx.RequestError as error:
        raise error

async def delete_camera_id(id, request):

    cookie = request.cookies.get("access_token")

    if cookie is None:
        raise HTTPException(detail="Cookie tidak tersedia!", status_code=status.HTTP_404_NOT_FOUND)

    data = jwt.decode(key=SECRET_KEY, token=cookie,algorithms=["HS256"])

    role = data["role"]

    if role not in ("STAFF","OWNER"):
        raise HTTPException(detail="Acess denied", status_code=status.HTTP_403_FORBIDDEN)
    
    try:
        psql = await db.ccvtv.delete(where={"cctv_id" : id})
        
        if psql is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Kamera dengan kode {id} tidak ditemukan!"
            )
        
        return {
            "message" : "Berhasil menghapus camera",
            "data": psql
        }
    except httpx.HTTPStatusError as http_error:
        raise http_error
    except httpx.RequestError as error:
        raise error


async def search_cctv_name(name, request):
    cookie = request.cookies.get("access_token")
    data = jwt.decode(key=SECRET_KEY, token=cookie,algorithms=["HS256"])
    role = data["role"]
    
    if cookie is None : 
        raise httpx.HTTPStatusError(detail="Cookie not found!", status_code=status.HTTP_404_NOT_FOUND)

    if role not in ("OWNER", "STAFF"):
        raise httpx.HTTPStatusError(detail="Error, CCTV Not found!", status_code=status.HTTP_404_NOT_FOUND)
            

    try:
        search = await db.ccvtv.find_many(where={
            "camera_name" : {
                "contains" : name,
                "mode" : "insensitive"
            }
        })

        if search is None:
            raise httpx.HTTPStatusError(detail="Error, CCTV Not found!", status_code=status.HTTP_404_NOT_FOUND)
        
        return search
    except httpx.HTTPStatusError as http_error:
       raise HTTPException(detail=http_error)
    except httpx.RequestError as error:
       raise HTTPException(detail=error)

async def update_cctv_category(category,id, request):
    cookie = request.cookies.get("access_token")
    data = jwt.decode(key=SECRET_KEY,token=cookie,algorithms=["HS256"])
    role = data["role"]

    if role == "VISITOR":
        raise HTTPException(detail="Access denied!",status_code=status.HTTP_403_FORBIDDEN)
    try:
        update_category = await db.ccvtv.update(where={"cctv_id" : id}, data={
            "category" : category.category
        })

        return {
            "message": "Success updated data",
            "data": update_category
        }
    except httpx.HTTPStatusError as http_error:
       raise HTTPException(detail=http_error)
    except httpx.RequestError as error:
       raise HTTPException(detail=error)
