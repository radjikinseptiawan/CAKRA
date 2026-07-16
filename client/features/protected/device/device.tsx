"use client";
import { Button } from "@mui/material";
import { CctvIcon } from "lucide-react";
import MapsDialogsAdd from "../map/m.dialogs/m.add";
import { useMapProvider } from "@/context/map.context";
import DeviceControllers from "./d.controllees";
import DeviceTable from "./table/table";
import MapsDialogsShow from "../map/m.dialogs/m.show";
import MapsDialogDelete from "../map/m.dialogs/m.delete";

export default function DeviceFeature() {
  return (
    <div className="px-2 py-4">
      <DeviceControllers />
      <DeviceTable />
      <MapsDialogsAdd />
      <MapsDialogsShow />
      <MapsDialogDelete />
    </div>
  );
}
