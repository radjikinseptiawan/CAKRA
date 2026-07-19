import {
  Box,
  Button,
  Container,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Check, Info, XIcon } from "lucide-react";

const historyData = [
  {
    id: 1,
    cameraName: "Depan NGOPIBAH",
    incidentDate: "22 Maret 2026",
    incidentTime: "14:00 WIB",
    thumbnail: "",
  },
  {
    id: 2,
    cameraName: "Parkiran Gedung A",
    incidentDate: "22 Maret 2026",
    incidentTime: "14:18 WIB",
    thumbnail: "",
  },
  {
    id: 3,
    cameraName: "Lobby Utama",
    incidentDate: "22 Maret 2026",
    incidentTime: "15:02 WIB",
    thumbnail: "",
  },
  {
    id: 4,
    cameraName: "Koridor Lantai 2",
    incidentDate: "22 Maret 2026",
    incidentTime: "15:27 WIB",
    thumbnail: "",
  },
  {
    id: 5,
    cameraName: "Pintu Belakang",
    incidentDate: "22 Maret 2026",
    incidentTime: "16:10 WIB",
    thumbnail: "",
  },
  {
    id: 6,
    cameraName: "Gerbang Timur",
    incidentDate: "23 Maret 2026",
    incidentTime: "08:15 WIB",
    thumbnail: "",
  },
  {
    id: 7,
    cameraName: "Area Kantin",
    incidentDate: "23 Maret 2026",
    incidentTime: "10:42 WIB",
    thumbnail: "",
  },
  {
    id: 8,
    cameraName: "Lapangan Parkir",
    incidentDate: "23 Maret 2026",
    incidentTime: "12:33 WIB",
    thumbnail: "",
  },
];

export default function HistoryTemplate() {
  return (
    <Container className="my-4 px-5 py-15">
      <div>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cuplikan</TableCell>
                <TableCell>Nama Kamera</TableCell>
                <TableCell>Tanggal Kejadian</TableCell>
                <TableCell>Waktu Kejadian</TableCell>
                <TableCell>
                  <div className="flex gap-x-2">
                    Aksi
                    <Tooltip title="Klik Benar jika AI mengenali insiden dengan benar, klik salah jika AI salah dalam mengenali insiden">
                      <Info size={12} />
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="bg-gray-500 px-2 py-3 w-32 h-12 rounded-md"></div>
                    </TableCell>
                    <TableCell>{item.cameraName}</TableCell>
                    <TableCell>{item.incidentDate}</TableCell>
                    <TableCell>{item.incidentTime}</TableCell>
                    <TableCell>
                      <Tooltip title="Benar">
                        <Button color="success">
                          <Check size={18} />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Salah">
                        <Button color="error">
                          <XIcon size={18} />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}
