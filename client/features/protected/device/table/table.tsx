import { CameraCCTVType } from "@/@types/camera.type";
import { getAllCamera } from "@/services/maps.service";
import {
  Button,
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
  const [cameras, setCameras] = useState<CameraCCTVType[]>([]);
  const router = useRouter();
  const getAllCamerasData = async () => {
    const response = await getAllCamera();
    setCameras(response);
  };

  useEffect(() => {
    getAllCamerasData();
  }, []);

  return (
    <div className="w-full">
      <TableContainer className="w-full my-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nomor</TableCell>
              <TableCell>Nama CCTV</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="w-full">
            {cameras.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.camera_name}</TableCell>
                  <TableCell>{item.latitude}</TableCell>
                  <TableCell>{item.longitude}</TableCell>
                  <TableCell>
                    <Button onClick={() => router.push(`?id=${item.cctv_id}`)}>
                      <EyeIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
