from typing import Optional
from fastapi import APIRouter, Response, Depends, Request
from lib.jwt import get_current_account
from schema.cctv_schema import CCTVCreate, CCTVUpdate
from schema.account_schema import AccountModel, ProfileModel, RegisterProfile, UpdateProfileModel
import services.main_service as Services
import services.cctv_service as CCTVService
import services.account_service as AccountService

router = APIRouter()

# Users Data
@router.get("/users")
async def all_users(account = Depends(get_current_account)):
    return await Services.get_all_users()

@router.patch("/users/{id}")
async def update_user(id,body : UpdateProfileModel, request: Request, account = Depends(get_current_account)):
    return await Services.update_selected_users(id,body, request)

# Authentication Router
@router.post("/account/login")
async def sign_in(body : AccountModel, response: Response):
    return await AccountService.sign_in_account(body, response)

@router.post("/account/register")
async def create_account(body : RegisterProfile ):
    return await AccountService.create_account(body)

@router.delete("/account/logout")
async def delete_cookie(response:Response, account = Depends(get_current_account)):
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
@router.get("/cctvs/list")
async def cctv_list(page, account = Depends(get_current_account)):
    return await CCTVService.limitation_camera(page)

@router.get("/cctvs", summary="Mengambil semua CCTV dari database")
async def get_camera_list(page:str,search : Optional[str] = None, category : Optional[str] = None,request:Request = None,account = Depends(get_current_account)):
    return await CCTVService.get_camera_service(page,search,category,request)

@router.patch("/cctvs/{id}", summary="Mengupdate kategori cctv")
async def update_camera_category(category : CCTVUpdate,id,request: Request, account=Depends(get_current_account)):
    return await CCTVService.update_cctv_category(category,id,request)

@router.post("/cctvs", summary="Menambahkan cctv baru ke sistem")
async def  add_camera(body : CCTVCreate, request: Request,account=Depends(get_current_account)):
    return  await CCTVService.create_camera_service(body,request)

@router.get("/cctvs/{id}", summary="Melihat detail dari cctv")
async def  get_detail_camera(id,account=Depends(get_current_account)):
    return  await CCTVService.get_camera_detail(id)

@router.delete("/cctvs/{id}")
async def  delete_camera_id(id, request: Request,account=Depends(get_current_account)):
    return await CCTVService.delete_camera_id(id, request)

# Komunikasi web-socket
@router.websocket("/ws/camera")
async def camera_strem():
    print("streaming start")