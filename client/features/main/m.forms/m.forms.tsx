import { useMapProvider } from "@/context/map.context";
import { Button, DialogActions, FormLabel, Input } from "@mui/material";
import { useCameraForms } from "../m.hooks/m.hooks";
import { useEffect } from "react";
import { addCamera, getAllCamera } from "@/services/maps.service";
import { CameraCCTVType } from "@/@types/camera.type";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MainForms() {
  const { isOpen, setIsOpen, selectedCoordinat } = useMapProvider();
  const router = useRouter();
  const {
    register,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useCameraForms();

  useEffect(() => {
    if (selectedCoordinat) {
      setValue("latitude", selectedCoordinat.lat);
      setValue("longitude", selectedCoordinat.lng);
    }
  }, [selectedCoordinat, setValue]);

  const closeDialogs = () => {
    setIsOpen(false);
  };

  const submitform = async (data: CameraCCTVType) => {
    try {
      const response = await addCamera(data);
      window.location.reload();
      setIsOpen(false);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitform)}
      className="flex flex-col gap-y-1 px-3"
    >
      <div className="flex flex-col gap-y-1">
        <FormLabel>Nama Camera</FormLabel>
        <Input
          autoComplete="off"
          autoCorrect="off"
          {...register("camera_name")}
        />
        {errors && (
          <p className="text-[12px] text-red-400">
            {errors.camera_name?.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-y-1">
        <FormLabel>Url Stream</FormLabel>
        <Input
          autoComplete="off"
          autoCorrect="off"
          {...register("stream_url")}
        />
        {errors && (
          <p className="text-[12px] text-red-400">
            {errors.stream_url?.message}
          </p>
        )}
      </div>

      <div className="flex gap-x-4 my-2">
        <div className="flex flex-col">
          <FormLabel>Latitude</FormLabel>
          <Input
            autoComplete="off"
            autoCorrect="off"
            {...register("latitude", { valueAsNumber: true })}
          />
          {errors && (
            <p className="text-[12px] text-red-400">
              {errors.latitude?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <FormLabel>Longitude</FormLabel>
          <Input
            autoComplete="off"
            autoCorrect="off"
            {...register("longitude", { valueAsNumber: true })}
          />
          {errors && (
            <p className="text-[12px] text-red-400">
              {errors.longitude?.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-x-4 my-2">
        <div className="flex flex-col">
          <FormLabel>IP Address</FormLabel>
          <Input
            autoComplete="off"
            autoCorrect="off"
            {...register("ip_address")}
          />
          {errors && (
            <p className="text-[12px] text-red-400">
              {errors.ip_address?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <FormLabel>Port</FormLabel>
          <Input
            autoComplete="off"
            autoCorrect="off"
            type="number"
            {...register("port", { valueAsNumber: true })}
          />
          {errors && (
            <p className="text-[12px] text-red-400">{errors.port?.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-x-4 my-2">
        <div className="flex flex-col">
          <FormLabel>RTSP Username</FormLabel>
          <Input
            autoComplete="off"
            autoCorrect="off"
            {...register("rstp_username")}
          />
          {errors && (
            <p className="text-[12px] text-red-400">
              {errors.rstp_username?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <FormLabel>RTSP Password</FormLabel>
          <Input
            type="password"
            autoComplete="off"
            autoCorrect="off"
            {...register("rstp_password")}
          />
          {errors && (
            <p className="text-[12px] text-red-400">
              {errors.rstp_password?.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <FormLabel>Deskripsi Lokasi</FormLabel>
        <Input
          autoComplete="off"
          autoCorrect="off"
          type="text"
          {...register("location_description")}
        />
        {errors && (
          <p className="text-[12px] text-red-400">
            {errors.location_description?.message}
          </p>
        )}
      </div>
      <DialogActions>
        <Button onClick={closeDialogs} type="button">
          Close
        </Button>
        <Button variant="contained" type="submit">
          Add Camera
        </Button>
      </DialogActions>
    </form>
  );
}
