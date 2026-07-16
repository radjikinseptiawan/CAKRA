import { useMapProvider } from "@/context/map.context";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Input,
} from "@mui/material";
import MapsForms from "../m.forms/m.forms";
import { Info } from "lucide-react";

export default function MapsDialogsAdd() {
  const { isOpen, setIsOpen } = useMapProvider();

  const closeDialogs = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onClose={closeDialogs}>
      <DialogTitle>Add Camera</DialogTitle>
      <DialogContent>
        <div className="flex gap-x-3 p-3 bg-orange-50 border border-orange-200 rounded-md text-orange-900 mb-4 items-start shadow-sm">
          <div className="flex-shrink-0 mt-0.5 text-base">⚠️</div>

          <div className="flex flex-col gap-y-1">
            <p className="font-bold text-orange-950 text-xs md:text-sm tracking-wide">
              PENTING: KETENTUAN PRIVASI & HUKUM
            </p>

            <hr className="border-orange-200" />

            <p className="text-[11px] md:text-[12px] leading-relaxed text-orange-900/90">
              Demi menjaga kenyamanan bersama, mohon hanya mendaftarkan kamera
              CCTV yang memantau area publik atau fasilitas umum. Sistem tidak
              menyarankan dan tidak bertanggung jawab atas penyalahgunaan atau
              dampak hukum yang terjadi akibat pendaftaran kamera di area yang
              bersifat domestik/privasi.
            </p>
          </div>
        </div>

        <MapsForms />
      </DialogContent>
    </Dialog>
  );
}
