from lib.db import db
from datetime import timezone, datetime
from fastapi import HTTPException, status
import httpx


# Mengambil semua camera CCTB
async def get_camera_service():
    try:
        data = await db.ccvtv.find_many()

        return data
    except httpx.HTTPStatusError as error:
        print(error)
    except httpx.RequestError as error:
        print(error)



# Menambahkan camera CCTV baru
async def create_camera_service(body):
    try:
        payload = {
            "camera_name" : body.camera_name,
            "stream_url" : body.stream_url,
            "latitude" : body.latitude,
            "longitude" : body.longitude,
            "location_description" : body.location_description,
            "ip_address" : body.ip_address,
            "port" : body.port,
            "rstp_username" : body.rstp_username,
            "rstp_password" : body.rstp_password,
            "created_at" : datetime.now(timezone.utc)
        }

        psql = await db.ccvtv.create(data=payload)

        return {
            "message" : "Berhasil menambahkan camera",
            "data": psql
        }
    except httpx.HTTPStatusError as error:
        print(error)
        return error
    except httpx.RequestError as error:
        print(error)
        return error

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

async def delete_camera_id(id):
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