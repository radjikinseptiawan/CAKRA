"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Paper,
  Typography,
  Box,
  TableHead,
  Button,
} from "@mui/material";
import { Check, X as XIcon, Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { HistoryItem } from "@/@types/data-history.type";
import axios from "axios";
import { getAllHistory } from "@/services/history.service";
import Image from "next/image";

type GrouppedHistory = Record<string, HistoryItem[]>;

const grouppedByDate = (datas: HistoryItem[]): GrouppedHistory => {
  if (!datas) return {};

  return datas.reduce((acc, item) => {
    const dateKey = item.date_incident.split("T")[0];

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push(item);

    return acc;
  }, {} as GrouppedHistory);
};

export default function HistoryTable() {
  const [history, setHistory] = useState();
  const [groupped, setGroupped] = useState<Record<string, HistoryItem[]>>({});
  const page = useSearchParams().get("page");
  const router = useRouter();
  if (!page) {
    router.push("?page=1");
  }

  const getAllHistoryData = async () => {
    try {
      const response = await getAllHistory(page as string);
      const results = response;
      setHistory(results);
      const grouped = grouppedByDate(results.data);
      setGroupped(grouped);
    } catch (error) {
      console.error(error);
    }
  };

  const statusSelection = (val: string) => {
    if (val == "CONFIRMED") {
      return "success";
    } else if (val == "REJECTED") {
      return "error";
    }
    return "default";
  };

  useEffect(() => {
    getAllHistoryData();
  }, []);

  const convertDate = (date: Date) => {
    return Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      year: "numeric",
      month: "short",
    }).format(date);
  };

  return (
    <Container className="my-4 h-screen">
      {Object.entries(groupped).map(([date, items]) => (
        <Paper className="px-4 py-4" key={date}>
          <Typography>{convertDate(new Date(date))}</Typography>
          <TableContainer className="my-4">
            <Table>
              <TableBody>
                {items.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell width={80}>
                        <Image
                          className="cursor-pointer"
                          src={item.image_url}
                          width={50}
                          height={50}
                          alt="image"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <p className="font-semibold">{item.camera_name}</p>
                          <p>{item.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip
                          variant="outlined"
                          color={statusSelection(item.status as string)}
                          label={item.status}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Deteksi Benar">
                          <Button color="success">
                            <Check />
                          </Button>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Deteksi Salah">
                          <Button color="error">
                            <XIcon />
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ))}
    </Container>
  );
}
