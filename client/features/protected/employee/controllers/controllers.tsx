"use client";
import { Button } from "@mui/material";
import { KeyIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployeeControllers() {
  const router = useRouter();
  return (
    <div className="py-15 px-5">
      <h1 className="text-black font-bold text-md md:text-xl">Hak Akses</h1>
      <div className="my-4">
        <Button
          onClick={() => router.push("?dialogs=add")}
          variant="contained"
          color="success"
        >
          <KeyIcon className="mx-1" />
          Tambah Hak Akses
        </Button>
      </div>
    </div>
  );
}
