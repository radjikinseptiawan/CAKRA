from fastapi import APIRouter, Response
from schema.cctv_schema import CCTVCreate
from schema.account_schema import AccountModel, ProfileModel, RegisterProfile
import services.main_service as Services
import services.cctv_service as CCTVService
import services.account_service as AccountService

router = APIRouter()

# Authentication Router
@router.post("/account/login")
async def sign_in(body : AccountModel, response: Response):
    return await AccountService.sign_in_account(body, response)

@router.post("/account/register")
async def create_account(body : RegisterProfile ):
    return await AccountService.create_account(body)

@router.delete("/account/logout")
async def delete_cookie(response:Response):
    return await AccountService.sign_out_account(response)

# Data kekerasan dari layanan eksternal & database
@router.get("/violance")
async def get_violance():
    return await Services.get_violance_service()

@router.post("/violance")
async def add_vioalance():
    return {"Hello" : "Hello"}

@router.patch("/violance")
async def update_status():
    return { "Hello": "Hello"}


# Manajemen Perangkat CCTV

@router.get("/cctvs", summary="Mengambil semua CCTV dari database")
async def get_camera_list():
    return await CCTVService.get_camera_service()

@router.post("/cctvs", summary="Menambahkan cctv baru ke sistem")
async def  add_camera(body : CCTVCreate):
    return  await CCTVService.create_camera_service(body)

@router.get("/cctvs/{id}", summary="Melihat detail dari cctv")
async def  get_detail_camera(id):
    return  await CCTVService.get_camera_detail(id)

@router.delete("/cctvs/{id}")
async def  delete_camera_id(id):
    return await CCTVService.delete_camera_id(id)

# Komunikasi web-socket
@router.websocket("/ws/camera")
async def camera_strem():
    print("streaming start")