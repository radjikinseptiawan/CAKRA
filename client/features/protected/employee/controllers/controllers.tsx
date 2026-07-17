"use client";
import { Box, Button, Container, TextField } from "@mui/material";
import { KeyIcon, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployeeControllers() {
  const router = useRouter();
  return (
    <Container>
      <div className="flex justify-between">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-xl font-bold md:text-2xl">Hak Akses</h1>
          <p>1 Pengguna Terdaftar di sistem</p>
          <TextField
            size="small"
            slotProps={{
              input: {
                startAdornment: <Search />,
              },
            }}
          />
        </div>

        <div>
          <Button disabled color="success" variant="contained">
            <Plus />
            Tambah Hak Akses
          </Button>
        </div>
      </div>
    </Container>
  );
}
