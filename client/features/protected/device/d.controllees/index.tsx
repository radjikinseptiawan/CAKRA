import { useMapProvider } from "@/context/map.context";
import { useTokenJWT } from "@/context/user.context";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ChevronDown, MapPin, Plus, Search } from "lucide-react";
import { useEffect } from "react";

export default function DeviceControllers() {
  const { setIsOpen, selectedCoordinat, setSelectedCoordinat } =
    useMapProvider();
  const user = useTokenJWT();

  const addCamera = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setSelectedCoordinat({ lat, lng });
    });
    setIsOpen(true);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude: lat, longitude: lng } = position.coords;
      setSelectedCoordinat({ lat, lng });
    });
  }, []);

  return (
    <Container>
      {/* box ke 1 */}
      <Box>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h1 className="text-xl font-bold md:text-2xl">
              Perangkat Terdaftar
            </h1>
            <p>21 titik CCTV di wilayah kamu</p>
          </div>
          <Button
            color="success"
            variant="contained"
            onClick={addCamera}
            className="!self-start sm:!self-auto"
          >
            <Plus size={18} />
            Tambah Perangkat
          </Button>
        </div>
      </Box>

      <Box>
        {/* Box ke 2 */}

        <div className="flex flex-col gap-4 sm:flex-row my-5">
          <div className="bg-lime-400/20 rounded-md px-4 py-3 w-full sm:w-1/2 flex justify-between items-center gap-x-2">
            <div className="min-w-0">
              <span className="flex gap-x-2 items-center">
                <div className="animate-pulse bg-green-600 rounded-full w-2 h-2 shrink-0" />
                <p className="text-green-700 flex items-center gap-x-2 text-sm sm:text-base truncate">
                  Lokasi Kamu
                  <span className="bg-green-600 rounded-full w-1 h-1 shrink-0" />
                  LIVE
                </p>
              </span>
              <p className="text-green-700 text-sm sm:text-base truncate">
                {selectedCoordinat?.lat}, {selectedCoordinat?.lng}
              </p>
            </div>
            <MapPin size={28} className="text-green-700 shrink-0" />
          </div>

          <div className="flex bg-black/20 rounded-md w-full sm:w-1/2 px-2 py-3">
            <div className="border-r-2 pr-4 text-center flex-1">
              <h4 className="text-sm">PUBLIK</h4>
              <p className="text-lg text-end font-bold md:text-xl">21</p>
            </div>
            <div className="mx-4 text-center flex-1">
              <h4 className="text-sm">PRIVAT</h4>
              <p className="text-lg font-bold text-start md:text-xl">0</p>
            </div>
          </div>
        </div>
      </Box>

      {/* Box ke 3 */}

      <Box>
        <div className="w-full">
          <div className="flex gap-x-3">
            <TextField
              variant="outlined"
              color="success"
              placeholder="CCTV...."
              slotProps={{
                input: {
                  startAdornment: (
                    <Search className="text-green-600 mr-5" size={25} />
                  ),
                },
              }}
              className="w-full"
            />
            <FormControl className="w-40">
              <InputLabel>Kategori</InputLabel>
              <Select>
                <MenuItem>SEMUA</MenuItem>
                <MenuItem>PUBLIC</MenuItem>
                <MenuItem>PRIVATE</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </Box>
    </Container>
  );
}
