"use client";

import { useState } from "react";
import {
  Box,
  Container,
  TextField,
  MenuItem,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

interface HistoryStats {
  total: number;
  pending: number;
  accuracy: number; // dalam persen, misal 92
}

interface HistoryControllersProps {
  stats?: HistoryStats;
  onSearchChange?: (value: string) => void;
  onDateFilterChange?: (value: string) => void;
  onStatusFilterChange?: (value: string) => void;
}

const dateOptions = [
  { value: "all", label: "Semua tanggal" },
  { value: "today", label: "Hari ini" },
  { value: "week", label: "Minggu ini" },
];

const statusOptions = [
  { value: "all", label: "Semua status" },
  { value: "pending", label: "Belum ditinjau" },
  { value: "benar", label: "Ditandai benar" },
  { value: "salah", label: "Ditandai salah" },
];

function StatCard({
  label,
  value,
  color,
}: {
  label?: string;
  value?: string | number;
  color?: string;
}) {
  return (
    <Paper elevation={0} className="p-4 bg-gray-50">
      <Typography variant="body2" className="text-gray-500 mb-1">
        {label}
      </Typography>
      <Typography variant="h5" style={{ color, fontWeight: 500 }}>
        {value}
      </Typography>
    </Paper>
  );
}

export default function HistoryControllers({
  stats,
  onSearchChange,
  onDateFilterChange,
  onStatusFilterChange,
}: HistoryControllersProps) {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  function handleSearchChange(value: string) {
    setSearch(value);
    onSearchChange?.(value);
  }

  function handleDateFilterChange(value: string) {
    setDateFilter(value);
    onDateFilterChange?.(value);
  }

  function handleStatusFilterChange(value: string) {
    setStatusFilter(value);
    onStatusFilterChange?.(value);
  }

  return (
    <Container className="my-4">
      <Box className="flex flex-wrap gap-3 mb-4">
        <TextField
          size="small"
          placeholder="Cari nama kamera"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <TextField
          size="small"
          select
          value={dateFilter}
          onChange={(e) => handleDateFilterChange(e.target.value)}
          className="w-[160px]"
        >
          {dateOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          size="small"
          select
          value={statusFilter}
          onChange={(e) => handleStatusFilterChange(e.target.value)}
          className="w-[180px]"
        >
          {statusOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Total kejadian" value={50} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Belum ditinjau" value={200} color="#B45309" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Akurasi AI" value={`96%`} color="#15803D" />
        </Grid>
      </Grid>
    </Container>
  );
}
