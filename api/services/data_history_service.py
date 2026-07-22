from fastapi import HTTPException, status, Query
from lib.db import db
from services.lib_service import get_role, date_filter
from datetime import datetime, timedelta, timezone
import httpx
import asyncio
from fastapi import HTTPException, status
from datetime import datetime
import asyncio
import httpx

async def get_search_name(request,s, page, limit):
    cookie = request.cookies.get("access_token")

    if cookie is None:
        raise HTTPException(detail="Access denied!")

    skip = (int(page) - 1) * int(limit)

    try:
        async def get_all_count_incident():
            return await db.incident_tragedy.count()

        async def get_all_still_pending():
            return await db.incident_tragedy.count(
                where={"status": "PENDING"}
            )

        async def get_selected_name():
            return await db.incident_tragedy.find_many(
                where={
                    "camera_name": {
                        "contains": s,
                        "mode": "insensitive",
                    }
                },
                skip=skip,
                take=limit,
                order={"created_at": "desc"},
            )

        total_count, pending_count, data = await asyncio.gather(
            get_all_count_incident(),
            get_all_still_pending(),
            get_selected_name(),
        )

        formatted_data = []

        for item in data:
            item_dict = item.dict() if hasattr(item, "dict") else dict(item)

            date_incident = item_dict.get("date_incident")

            if isinstance(date_incident, datetime):
                item_dict["time"] = date_incident.strftime("%H:%M:%S")

            elif isinstance(date_incident, str):
                try:
                    dt = datetime.fromisoformat(
                        date_incident.replace("Z", "+00:00")
                    )
                    item_dict["time"] = dt.strftime("%H:%M:%S")
                except ValueError:
                    item_dict["time"] = None

            else:
                item_dict["time"] = None

            formatted_data.append(item_dict)

        has_more = (skip + len(data)) < total_count

        return {
            "meta": {
                "total": total_count,
                "pending": pending_count,
                "page": page,
                "limit": limit,
                "has_more": has_more,
            },
            "data": formatted_data,
        }

    except httpx.HTTPStatusError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
        )

    except httpx.RequestError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
        )

    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(error),
        )
    
async def get_all_history (
        request,
        status_history,
        date,
        page,
        limit
):
    cookie = request.cookies.get("access_token")

    if cookie is None : 
        raise HTTPException(detail="ACCESS DENIED",status_code=status.HTTP_403_FORBIDDEN)

    skip = (int(page) - 1) * int(limit)

    where = {}
    try:

        async def get_all_count_incident():
           return await db.incident_tragedy.count()
                    
        async def get_all_still_pending():
           return await db.incident_tragedy.count(where={"status" : "PENDING"})

        if status_history == "all":
            print(status_history)
            async def get_all_incident():
              return await db.incident_tragedy.find_many(
                 skip=skip,
                 take=limit,
                 order={"created_at" : "desc"},
             )
                                  
            data, total_count, pending_count = await asyncio.gather(
               get_all_incident(),
               get_all_count_incident(),
               get_all_still_pending()
             ) 

        if status_history != "all":
            where["status"] = status_history.upper()
            async def get_all_incident():
              return await db.incident_tragedy.find_many(
                 skip=skip,
                 where=where,
                 take=limit,
                 order={"created_at" : "desc"},
             )
                                  
            data, total_count, pending_count = await asyncio.gather(
               get_all_incident(),
               get_all_count_incident(),
               get_all_still_pending()
             ) 

        if date == "today":
            start,end = date_filter(date)

            where["date_incident"] = {
                "gte" : start,
                "lt" : end
            }

            async def get_all_incident():
               return await db.incident_tragedy.find_many(
                  skip=skip,
                  where= where,
                  take=limit,
                  order={"created_at" : "desc"},
              )
           
            data, total_count, pending_count = await asyncio.gather(
              get_all_incident(),
              get_all_count_incident(),
              get_all_still_pending()
            )

        print(where)

        if date == "weekly":
            start,end = date_filter(date)
            where["date_incident"] = {
                "gte" : start,
                "lt" : end
            }
            async def get_all_incident():
               return await db.incident_tragedy.find_many(
                  skip=skip,
                  where= where,
                  take=limit,
                  order={"created_at" : "desc"},
              )
           
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


async def update_history (request,body,id):
    role = get_role(request)

    if role == "VISITOR":
        raise HTTPException(detail="Access denied!",status_code=status.HTTP_403_FORBIDDEN)

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
