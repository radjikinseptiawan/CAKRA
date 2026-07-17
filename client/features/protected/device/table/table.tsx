import { CameraSchema } from "@/@types/camera.type";
import { getAllCamera } from "@/services/maps.service";
import {
  Badge,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeviceTable() {
  const [cameras, setCameras] = useState<CameraSchema[]>([]);
  const router = useRouter();

  const getAllCamerasData = async () => {
    const response = await getAllCamera();
    setCameras(response);
  };

  useEffect(() => {
    getAllCamerasData();
  }, []);

  return (
    <Container>
      <TableContainer
        className="w-full my-4 shadow-xl overflow-x-auto"
        component={Paper}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow className=" bg-black/20 font-semibold">
              <TableCell>Nomor</TableCell>
              <TableCell>Nama CCTV</TableCell>
              <TableCell className="hidden sm:table-cell">Latitude</TableCell>
              <TableCell className="hidden sm:table-cell">Longitude</TableCell>
              <TableCell className="hidden md:table-cell">Kategori</TableCell>
              <TableCell>Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="w-full">
            {cameras.map((item, index) => (
              <TableRow
                key={item.cctv_id ?? index}
                className="cursor-pointer hover:bg-lime-300/20 even:bg-black/5"
                onClick={() =>
                  router.push(`/map?lat=${item.latitude}&lng=${item.longitude}`)
                }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-[140px] truncate sm:max-w-none">
                  {item.camera_name}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item.latitude}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item.longitude}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Chip
                    color={item.category === "PUBLIC" ? "success" : "warning"}
                    label={item.category === "PUBLIC" ? `Public` : "Private"}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    color="success"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`?id=${item.cctv_id}`);
                    }}
                  >
                    <EyeIcon size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
