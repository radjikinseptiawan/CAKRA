import { deleteCamera } from "@/services/maps.service";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { AlertCircleIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MainDialogDelete() {
  const router = useRouter();
  const confirmation = useSearchParams().get("confirmation");
  const id = useSearchParams().get("id");
  const deleteCameraCCTV = async () => {
    if (!id) return null;
    const response = await deleteCamera(id as string);
    window.location.replace("/");
    return response;
  };

  return (
    <Dialog className="px-2" open={confirmation ? true : false}>
      <DialogTitle>Kamu serius?</DialogTitle>
      <hr className="text-gray-500 mx-5" />
      <DialogContent>
        Kamera CCTV akan terhapus dari sistem kami, namun kamu tetap dapat
        mendaftarkan nya kembali dimasa mendatang
      </DialogContent>
      <DialogActions>
        <Button onClick={() => router.back()}>Batal</Button>
        <Button onClick={deleteCameraCCTV} variant="contained" color="error">
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}
