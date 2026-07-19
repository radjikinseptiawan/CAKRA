from fastapi import FastAPI
from os import getenv
from fastapi.middleware.cors import CORSMiddleware
from router.router import router
from lib.db import db

local = getenv("WEB_URL_LOCAL", "http://localhost:3000")
# production = getenv("WEB_URL_PRODUCTION")

app = FastAPI()
origins = [url for url in [local, production] if url]

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

@app.on_event("shutdown")
async def shutdown():
        await db.disconnect()
        print("Koneksi database prisma berhasil diputus dengan aman")
