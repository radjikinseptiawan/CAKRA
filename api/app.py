from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router.router import router
from lib.db import db


app = FastAPI()
origins = ["http://localhost:3000"]

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

app.on_event("shutdown")
async def shutdown():
        await db.disconnect()
        print("Koneksi database prisma berhasil diputus dengan aman")