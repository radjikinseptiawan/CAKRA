import z from "zod";

const ipv4Regex =
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const MainAddCameraSchema = z.object({
  camera_name: z.string().min(1, "Nama camera wajib di isi!"),
  stream_url: z.string().min(1, "URL stream wajib di isi!"),
  latitude: z.float64(),
  longitude: z.float64(),
  port: z.number().min(1, "angka tidak boleh 0"),
  location_description: z.string().min(1, "Nama camera wajib di isi!"),
  ip_address: z
    .string()
    .min(1, "IP Wajib diisi!")
    .regex(ipv4Regex, "IP Address tidak valid!"),
  rstp_username: z.string().min(1, "RTSP Username wajib di isi!"),
  rstp_password: z.string().min(1, "RTSP Password wajib di isi!"),
});

export type MainAddCameraSchema = z.infer<typeof MainAddCameraSchema>;
