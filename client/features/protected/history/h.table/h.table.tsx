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
import { HistoryItem, HistoryType } from "@/@types/data-history.type";
import axios from "axios";
import {
  getAllHistory,
  updateConfirmedStatus,
  updateRejectedStatus,
} from "@/services/history.service";
import Image from "next/image";
import { useHistoryContext } from "../h.hooks";
import { useTokenJWT } from "@/context/user.context";
import { convertDate, statusSelection } from "@/lib/common";

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
  const { setHistory, dateIncident, status, history } = useHistoryContext();
  const [groupped, setGroupped] = useState<Record<string, HistoryItem[]>>({});
  const user = useTokenJWT();
  const page = useSearchParams().get("page");
  const router = useRouter();
  if (!page) {
    router.push("?page=1");
  }

  const getAllHistoryData = async () => {
    try {
      const response = await getAllHistory(status, dateIncident);
      const results = response;
      setHistory(results);
      const grouped = grouppedByDate(results.data);
      setGroupped(grouped);
    } catch (error) {
      console.error(error);
    }
  };

  const updateRejected = async (id: string) => {
    try {
      setGroupped((prev) => {
        let nextState: GrouppedHistory = {};
        if (!prev) return {};
        for (const [date, items] of Object.entries(prev)) {
          nextState[date] = items.map((item) =>
            item.incident_id == id ? { ...item, status: "REJECTED" } : item,
          );
        }
        return nextState;
      });
      const response = await updateRejectedStatus(id);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const updateConfirmed = async (id: string) => {
    try {
      setGroupped((prev) => {
        let nextState: GrouppedHistory = {};
        if (!prev) return {};
        for (const [date, items] of Object.entries(prev)) {
          nextState[date] = items.map((item) =>
            item.incident_id == id ? { ...item, status: "CONFIRMED" } : item,
          );
        }
        return nextState;
      });

      await updateConfirmedStatus(id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllHistoryData();
  }, []);

  useEffect(() => {
    if (history?.data) {
      setGroupped(grouppedByDate(history?.data));
    }
  }, [history]);

  return (
    <Container className="my-4 h-screen">
      {Object.entries(groupped).map(([date, items]) => (
        <Paper className="px-4 py-4 my-5" key={date}>
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
                        <Tooltip
                          title={
                            user?.role == "VISITOR"
                              ? "Kamu tidak memiliki akses"
                              : "Deteksi Benar"
                          }
                        >
                          <span>
                            <Button
                              disabled={user?.role == "VISITOR"}
                              onClick={() => updateConfirmed(item.incident_id)}
                              color="success"
                            >
                              <Check />
                            </Button>
                          </span>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title={
                            user?.role == "VISITOR"
                              ? "Kamu tidak memiliki akses"
                              : "Deteksi Salah"
                          }
                        >
                          <span>
                            <Button
                              disabled={user?.role == "VISITOR"}
                              onClick={() => updateRejected(item.incident_id)}
                              color="error"
                            >
                              <XIcon />
                            </Button>
                          </span>
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
