import { CameraSchema } from "@/@types/camera.type";
import {
  selectCameraCategory,
  updateCameraCategory,
} from "@/services/maps.service";
import {
  Badge,
  Button,
  Chip,
  Container,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { EyeIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCameraContext } from "../d.hooks/device.hooks";
import { useTokenJWT } from "@/context/user.context";

export default function DeviceTable() {
  const { camera, setCameras, setCount, selected } = useCameraContext();
  const [number, setNumber] = useState<number>(1);
  const [data, setData] = useState<any>();
  const router = useRouter();
  const page = useSearchParams().get("page");
  const user = useTokenJWT();

  const getAllCamerasData = async () => {
    if (!page) {
      router.push("?page=1");
    }

    const response = await selectCameraCategory(selected, page as string);
    if (!response) return null;

    setCount({ private: response.private, public: response.public });
    setData(response);
    setCameras(response.data);
  };

  const updateCategory = async (body: string, id: string) => {
    setCameras((prev) =>
      prev.map((item) =>
        item.cctv_id == id ? { ...item, category: body } : item,
      ),
    );
    const payload = {
      category: body as string,
    };
    const response = await updateCameraCategory(payload, id);
    return response;
  };

  useEffect(() => {
    getAllCamerasData();
  }, [number, page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setNumber(value);
    router.push(`?page=${value}`);
  };

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
            {camera &&
              camera.map((item, index) => (
                <TableRow
                  key={item.cctv_id ?? index}
                  className="cursor-pointer hover:bg-lime-300/20 even:bg-black/5"
                  onClick={() =>
                    router.push(
                      `/map?lat=${item.latitude}&lng=${item.longitude}`,
                    )
                  }
                >
                  <TableCell>{(number - 1) * 20 + index + 1}</TableCell>
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
                    {user?.role == "OWNER" || user?.role == "STAFF" ? (
                      <Select
                        value={item.category}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => {
                          e.stopPropagation();
                          updateCategory(
                            e.target.value,
                            item.cctv_id as string,
                          );
                        }}
                        renderValue={(value) => (
                          <Chip
                            size="small"
                            color={value === "PUBLIC" ? "success" : "warning"}
                            label={value === "PUBLIC" ? "Public" : "Private"}
                          />
                        )}
                        sx={{
                          minWidth: 120,
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "& .MuiSelect-select": {
                            p: 0,
                            display: "flex",
                            alignItems: "center",
                          },
                        }}
                      >
                        <MenuItem value="PUBLIC">
                          <Chip size="small" color="success" label="Public" />
                        </MenuItem>

                        <MenuItem value="PRIVATE">
                          <Chip size="small" color="warning" label="Private" />
                        </MenuItem>
                      </Select>
                    ) : (
                      <Chip
                        color={
                          item.category === "PUBLIC" ? "success" : "warning"
                        }
                        label={
                          item.category === "PUBLIC" ? `Public` : "Private"
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="success"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`?page=${page}&id=${item.cctv_id}`);
                      }}
                    >
                      <EyeIcon size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <div className="flex justify-center my-4">
          <Pagination
            count={data?.total_page || 1}
            page={number}
            onChange={handlePageChange}
            color="standard"
            variant="outlined"
            shape="rounded"
          />
        </div>
      </TableContainer>
    </Container>
  );
}
