import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MainAddCameraSchema } from "../m.schema/m.interface";

export const useCameraForms = () => {
  return useForm({
    resolver: zodResolver(MainAddCameraSchema),
    defaultValues: {
      camera_name: "",
      ip_address: "",
      latitude: 0,
      port: 0,
      longitude: 0,
      location_description: "",
      rstp_password: "",
      rstp_username: "",
      stream_url: "",
    },
  });
};
