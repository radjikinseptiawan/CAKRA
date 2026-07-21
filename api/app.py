from fastapi import FastAPI
from os import getenv
from fastapi.middleware.cors import CORSMiddleware
from router.router import router
from router.cctv_router import cctv
from lib.db import db

local = getenv("WEB_URL_LOCAL")
production = getenv("WEB_URL_PRODUCTION")

app = FastAPI()
origins = [local, production]

@app.on_event("startup")
async def start_up():
        await db.connect()
        print("Sukses terhubung ke database")

app.add_middleware(CORSMiddleware, 
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=['*']
        )


app.include_router(router, prefix="/api/v1.0")
app.include_router(cctv, prefix="/api/v1.0")

app.on_event("shutdown")
async def shutdown():
        await db.disconnect()
        print("Koneksi database prisma berhasil diputus dengan aman")