"use client";
import MapsDialogsAdd from "../map/m.dialogs/m.add";
import DeviceControllers from "./d.controllees";
import DeviceTable from "./table/table";
import MapsDialogsShow from "../map/m.dialogs/m.show";
import MapsDialogDelete from "../map/m.dialogs/m.delete";

export default function DeviceFeature() {
  return (
    <div className="px-5 py-15">
      <DeviceControllers />
      <DeviceTable />
      <MapsDialogsAdd />
      <MapsDialogsShow />
      <MapsDialogDelete />
    </div>
  );
}
