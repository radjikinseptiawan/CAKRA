"use client";
import L, { popup } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { KabupatenEntry, RawEntry } from "@/@types/maps.type";
import { buildPopupHtml, groupByKabupaten } from "../popup";
import { getAllCamera, getViolence } from "@/services/maps.service";
import { useKotaKab } from "@/context/kota.context";
import { useMapProvider } from "@/context/map.context";
import { Cctv } from "lucide-react";
import { renderToString } from "react-dom/server";
import { ca } from "zod/locales";
import { CameraSchema } from "@/@types/camera.type";
import { useRouter, useSearchParams } from "next/navigation";

export default function Maps() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { setSelectedCoordinat, setIsOpen } = useMapProvider();
  const { daerah, setDaerah } = useKotaKab();
  const [cameras, setCameras] = useState<[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const getAllCamerasData = async () => {
    const response = await getAllCamera();
    setCameras(response.data);
  };

  useEffect(() => {
    getAllCamerasData();
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const indonesiaBounds = L.latLngBounds(
      L.latLng(-11.5, 94.5),
      L.latLng(6.5, 141.5),
    );

    const map = L.map(mapRef.current, {
      center: [-2.548926, 118.0148634],
      zoom: 5,
      maxBounds: indonesiaBounds,
      minZoom: 5,
      doubleClickZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    map.on("dblclick", (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      setSelectedCoordinat({ lat, lng });
      setIsOpen(true);
    });
    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);

      if (!isNaN(latNum) && !isNaN(lngNum)) {
        map.flyTo([latNum, lngNum], 18, {
          animate: true,
          duration: 1.5,
        });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const map = mapInstanceRef.current;

    if (!map) {
      console.log(`Peta Belum siap, skip render marker`);
      return;
    }

    const cctvSvgString = renderToString(
      <Cctv size={18} className="text-white" />,
    );

    const cctvIcon = L.divIcon({
      html: `
      <div class="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full border-2 border-white shadow-lg transform -translate-y-1/2">
        ${cctvSvgString}
      </div>
    `,
      className: "custom-div-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    cameras.forEach((cam: CameraSchema) => {
      if (cam.latitude && cam.longitude) {
        const popupContent = document.createElement("div");
        popupContent.className =
          "p-2 text-gray-800 w-[260px] flex flex-col gap-y-2";

        const textContainer = document.createElement("div");
        textContainer.className = "flex flex-col gap-y-0.5 text-left px-0.5";

        const title = document.createElement("h3");
        title.innerText = cam.camera_name;
        title.className =
          "font-bold text-sm text-gray-950 leading-tight truncate";
        textContainer.appendChild(title);

        const description = document.createElement("p");
        description.innerText =
          cam.location_description || "Tidak ada deskripsi lokasi.";
        description.className =
          "text-xs text-gray-500 line-clamp-2 leading-relaxed mt-0.5";
        textContainer.appendChild(description);

        const divider = document.createElement("hr");
        divider.className = "border-gray-100 my-1";
        textContainer.appendChild(divider);

        const button = document.createElement("button");
        button.innerText = "Lihat Detail";
        button.className =
          "bg-green-600 px-2 py-1 font-bold text-white rounded-md cursor-pointer";

        button.addEventListener("click", () => {
          router.push(`?id=${cam.cctv_id}`);
        });
        textContainer.appendChild(button);
        popupContent.appendChild(textContainer);
        L.marker([cam.latitude, cam.longitude], { icon: cctvIcon })
          .addTo(map)
          .bindPopup(popupContent);
      }
    });
  }, [cameras]);

  return <div ref={mapRef} className="w-full h-screen mt-4 z-48" />;
}
