"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";

export default function EmployeeAddDialog() {
  const dialog = useSearchParams().get("dialogs");
  const router = useRouter();
  return (
    <Dialog open={dialog ? true : false}>
      <DialogTitle className="text-green-600 font-semibold">
        Menambahkan Karyawan
      </DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={() => router.push("/employee")} color="success">
          Batal
        </Button>
        <Button color="success" variant="contained">
          Tambah
        </Button>
      </DialogActions>
    </Dialog>
  );
}
