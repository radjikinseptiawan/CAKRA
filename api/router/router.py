from fastapi import APIRouter
from schema.cctv_schema import CCTVCreate
import services.main_service as Services
import services.cctv_service as CCTVService
router = APIRouter()


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