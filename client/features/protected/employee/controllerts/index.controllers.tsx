import { Button } from "@mui/material";
import { KeyIcon } from "lucide-react";

export default function EmployeeControllers() {
  return (
    <>
      <h1 className="text-black font-bold text-md my-2 md:text-xl">
        Hak Akses
      </h1>
      <div>
        <Button variant="contained" className="flex gap-x-2   items-center">
          <KeyIcon />
          Tambah Hak Akses
        </Button>
      </div>
    </>
  );
}
