from pydantic import BaseModel, Field
from typing import Optional

class CCTVCreate(BaseModel):
    camera_name : str = Field(...,examples=["Kamera depan toko"])
    stream_url : str = Field(...,examples=["rtsp://192.168.1.100/stream1"])
    latitude : float = Field(None, examples=[-6.2088])
    longitude : float = Field(None, examples=[106.8456])
    ip_address : str = Field(None, examples=["192.168.1.100"])
    port : int = Field(None, examples=[554])
    rstp_username : str = Field(None, examples=["admin"])
    rstp_password : str = Field(None, examples=['securepass'])
    location_description: Optional[str] = Field(None, examples=["Gerbang utama perumahan Kerta Mukti blok C"])
