from fastapi import HTTPException
from prisma import Prisma
from lib.db import db
import httpx

headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
        "Accept": "application/json",
    }


async def get_violance_service():
    url = "https://data.jabarprov.go.id/api-backend/bigdata/dp3akb/od_17213_jml_kasus_kekerasan_brdsrkn_tempat_kejadian_kekera_v1?limit=9999"

    all_data =[]
    limit = 1000
    skip = 0

    try:
        async with httpx.AsyncClient(timeout=10.0,headers=headers) as client:
            while True:
                response = await client.get(url, params={'limit' :limit, 'skip':skip})
                response.raise_for_status()
                payload = response.json()
                data = payload.get("data",[])

                all_data.extend(data)

                total_record = payload.get("meta",{}).get("total_record",0)
                skip += limit

                if skip >= total_record or not data:
                    break

            return {
            "message": "Data retrieved successfully",
            "error": 0,
            "data": all_data,
            }
    except httpx.HTTPStatusError as error:
        print(f"Upstream returned an error: {error}")
    except httpx.RequestError as error:
        print(f"request failed: {error}")

