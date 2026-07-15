import { CameraCCTVType } from "@/@types/camera.type";
import { getDetailCamera } from "@/services/maps.service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Trash } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainDialogsShow() {
  const id = useSearchParams().get("id");
  const router = useRouter();
  const [selectedCamera, setSelectedCamera] = useState<CameraCCTVType>();

  const getDetailCameras = async () => {
    if (!id) return null;
    const response = await getDetailCamera(id as string);
    setSelectedCamera(response);
  };

  useEffect(() => {
    getDetailCameras();
  }, [router, id]);
  return (
    <Dialog open={id ? true : false} onClose={() => router.back()}>
      <DialogTitle>
        <Typography>{selectedCamera?.camera_name}</Typography>
      </DialogTitle>
      <hr className="text-gray-300" />
      <DialogContent>
        <div className="w-full aspect-video bg-black rounded-md overflow-hidden flex items-center justify-center shadow-inner relative">
          {id && selectedCamera ? (
            <video
              className="w-full h-full object-cover"
              controls={false}
              playsInline
              autoPlay
              muted
              src={selectedCamera.stream_url}
            />
          ) : (
            <div className="bg-black"></div>
          )}
        </div>
        <p>{selectedCamera?.location_description}</p>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          color="info"
          onClick={() => router.back()}
        >
          Close
        </Button>
        <Button size="small" variant="contained" color="error">
          <Trash /> Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
