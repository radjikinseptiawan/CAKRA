import { useMapProvider } from "@/context/map.context";
import { Button, Paper } from "@mui/material";
import { CctvIcon } from "lucide-react";
import { useEffect } from "react";

export default function DeviceControllers() {
  const { setIsOpen, selectedCoordinat, setSelectedCoordinat } =
    useMapProvider();

  const addCamera = () => {
    const maps = navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setSelectedCoordinat({ lat, lng });
    });
    setIsOpen(true);
    return maps;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setSelectedCoordinat({ lat, lng });
    });
  }, []);

  return (
    <>
      <h1 className="text-black font-bold text-md my-2 md:text-xl">
        Perangkat Terdaftar
      </h1>
      <div>
        <Button
          onClick={addCamera}
          variant="contained"
          color="success"
          className="flex gap-x-2   items-center"
        >
          <CctvIcon />
          Tambah Perangkat
        </Button>
        <Paper className="text-black my-4 py-3 px-2 w-72">
          <p>Koordinat kamu:</p>
          <hr className="my-3" />
          <p>latitude: {selectedCoordinat?.lat}</p>
          <p>longitude: {selectedCoordinat?.lng}</p>
        </Paper>
      </div>
    </>
  );
}
