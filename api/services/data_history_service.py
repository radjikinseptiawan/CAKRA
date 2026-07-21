from fastapi import HTTPException, status, Query
from lib.db import db
from datetime import datetime
import httpx
import asyncio

async def get_all_history (
        page,
        limit
):
    skip = (int(page) - 1) * int(limit)

    try:
        async def get_all_incident():
            return await db.incident_tragedy.find_many(
                skip=skip,
                take=limit,
                order={"created_at" : "desc"},
            )

        async def get_all_count_incident():
            return await db.incident_tragedy.count()
        
        async def get_all_still_pending():
            return await db.incident_tragedy.count(where={"status" : "PENDING"})
        data, total_count, pending_count = await asyncio.gather(
            get_all_incident(),
            get_all_count_incident(),
            get_all_still_pending()
        )

        formatted_data = []
        for item in data:
            item_dict = item.dict() if hasattr(item, "dict") else dict(item)
            
            date_incident = item_dict.get("date_incident")
            
            if isinstance(date_incident, datetime):
                item_dict["time"] = date_incident.strftime("%H:%M:%S")
            elif isinstance(date_incident, str):
                try:
                    dt = datetime.fromisoformat(date_incident.replace("Z", "+00:00"))
                    item_dict["time"] = dt.strftime("%H:%M:%S")
                except ValueError:
                    item_dict["time"] = None
            else:
                item_dict["time"] = None

            formatted_data.append(item_dict)

        has_more = (skip + len(data)) < total_count

        return {
            "meta":{
                "total" : total_count,
                "pending" : pending_count,
                "page" : page,
                "limit" : limit,
                "has_more" : has_more
            },
            "data" : formatted_data
        }
    except httpx.HTTPStatusError as error:
        raise HTTPException(detail=error, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except httpx.RequestError as error:
         raise HTTPException(detail=error, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)


async def update_history (body,id):
    try:
        payload = {
            "status" : body.status
        }

        if payload is None:
            HTTPException(detail="Payload still empty!")

        data = await db.incident_tragedy.update(where={
            "incident_id" : id
        },data=payload)

        return data
    except httpx.HTTPStatusError as error:
        raise HTTPException(detail=error, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except httpx.RequestError as error:
         raise HTTPException(detail=error, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

async def created_history (body):
    try:
        payload = {
            "date_incident" : body.date_incident,
            "camera_name" : body.camera_name,
            "image_url" : body.image_url,
            "status" : body.status
        }

        if payload is None:
            HTTPException(detail="Payload still empty!")

        data = await db.incident_tragedy.create(payload)      

        if data is None:
            HTTPException(detail="Failed to created history!")

        return data  
    except httpx.HTTPStatusError as error:
        raise HTTPException(detail=error, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except httpx.RequestError as error:
         raise HTTPException(detail=error, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
