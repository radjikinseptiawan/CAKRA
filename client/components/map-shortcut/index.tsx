import { CameraSchema } from "@/@types/camera.type";
import { SummaryType } from "@/@types/home.type";
import { getAllCamera } from "@/services/maps.service";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Cctv } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

export default function MapShortcut(data: { data: CameraSchema[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [cameras, setCameras] = useState<[]>([]);

  console.log(data);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [-6.241586, 106.992416],
      zoom: 15,
      dragging: false,
      scrollWheelZoom: false,
      touchZoom: false,
      zoomControl: false,
      minZoom: 13,
      doubleClickZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    mapInstanceRef.current = map;

    const t1 = setTimeout(() => map.invalidateSize(), 100);
    const t2 = setTimeout(() => map.invalidateSize(), 500);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapRef.current);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

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

    data.data.forEach((cam: CameraSchema) => {
      if (cam.latitude && cam.longitude) {
        L.marker([cam.latitude, cam.longitude], { icon: cctvIcon }).addTo(map);
      }
    });
  }, [data]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      className="z-50"
    />
  );
}
