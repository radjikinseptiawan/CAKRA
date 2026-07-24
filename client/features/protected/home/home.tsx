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
import HomeHeaders from "./h.headers";
import HomeMaps from "./h.maps";
import HomeTables from "./h.table";
import { getSummaryData } from "@/services/home.service";
import { useEffect, useState } from "react";
import { SummaryType } from "@/@types/home.type";

export default function HomeFeature() {
  const [count, setCount] = useState<SummaryType>();
  const getSummary = async () => {
    const data = await getSummaryData();
    setCount(data);
  };

  useEffect(() => {
    getSummary();
  }, []);

  if (!count) return null;
  return (
    <Container className="py-15 flex justify-center">
      <Box>
        <HomeHeaders data={count} />
        <HomeMaps data={count} />
        <HomeTables data={count} />
      </Box>
    </Container>
  );
}
