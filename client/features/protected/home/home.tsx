"use client";
import dynamic from "next/dynamic";
import { useTokenJWT } from "@/context/user.context";
import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { ArrowRight, Camera, Globe, Info, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const MapShortcut = dynamic(() => import("../../../components/map-shortcut"), {
  ssr: false,
});

export default function HomeFeature() {
  const user = useTokenJWT();
  const router = useRouter();
  return (
    <Container className="py-15 flex justify-center">
      <Box>
        <div>
          <h1 className="font-semibold text-sm md:text-xl">
            Selamat datang kembali, {user?.username}
          </h1>
          <p className="text-gray-500 text-[12px] md:text-sm">
            Ringkasan wilayah pengawasan kamu hari ini.
          </p>
        </div>

        <div className="flex gap-x-8">
          <Paper className="w-52  px-3 my-5 py-3">
            <div className="bg-green-500/10 p-3 py-2 w-12 rounded-md text-green-500">
              <Camera />
            </div>
            <h1 className="mt-3 font-bold text-xl">21</h1>
            <p className="font-semibold text-sm">Total CCTV</p>
            <p className="text-gray-400 text-[12px]">Titik terpasang</p>
          </Paper>

          <Paper className="w-52 px-3 my-5 py-3">
            <div className="bg-gray-500/10 p-3 py-2 w-12 rounded-md text-gray-500">
              <Globe />
            </div>
            <h1 className="mt-3 font-bold text-xl">19</h1>
            <p className="font-semibold text-sm">Publik</p>
            <p className="text-gray-400 text-[12px]">Kamera Publik</p>
          </Paper>

          <Paper className="w-52 px-3 my-5 py-3">
            <div className="bg-orange-500/10 p-3 py-2 w-12 rounded-md text-orange-500">
              <Lock />
            </div>
            <h1 className="mt-3 font-bold text-xl">2</h1>
            <p className="font-semibold text-sm">Private</p>
            <p className="text-gray-400 text-[12px]">Kamera Private</p>
          </Paper>

          <Paper className="w-52 px-3 my-5 py-3">
            <div className="bg-lime-500/10 p-3 py-2 w-12 rounded-md text-lime-500">
              <Info />
            </div>
            <h1 className="mt-3 font-bold text-xl">0</h1>
            <p className="font-semibold text-sm">Belum Ditinjau</p>
            <p className="text-gray-400 text-[12px]">Kejadian</p>
          </Paper>
        </div>

        <div>
          <Paper className="px-2 overflow-hidden w-full py-3">
            <div className="flex justify-between">
              <div>
                <h1 className="font-semibold text-[14px] md:text-[16px]">
                  Peta Wilayah
                </h1>
                <p className="text-gray-400 text-[12px] md:text-sm">
                  21 titik CCTV aktif
                </p>
              </div>
              <Button
                onClick={() => router.push("/map")}
                color="success"
                variant="text"
                size="small"
              >
                Lihat detail lengkap <ArrowRight className="mx-3" />
              </Button>
            </div>
            <div className="w-full h-96 mt-3 rounded-md overflow-hidden">
              <MapShortcut />
            </div>
          </Paper>
        </div>

        <div>
          <Paper className="my-4 px-2 py-3">
            <div className="flex justify-between">
              <h1 className="text-sm my-4 font-semibold">Aktivitas Terbaru</h1>
              <Button
                color="success"
                size="small"
                variant="text"
                onClick={() => router.push("/history?page=1")}
              >
                Semua
              </Button>
            </div>
            <hr className="text-gray-300" />
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="w-15">
                      <div className="bg-gray-500/10 text-gray-500 w-10 rounded-md px-2 py-2">
                        <Camera />
                      </div>
                    </TableCell>
                    <TableCell className="">
                      <div>
                        <h3>Depan Anugrah Motor</h3>
                        <p>22 Jul 2026</p>
                      </div>
                    </TableCell>
                    <TableCell className="w-32">
                      <Chip
                        color="success"
                        variant="outlined"
                        label="CONFIRMED"
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </Box>
    </Container>
  );
}
