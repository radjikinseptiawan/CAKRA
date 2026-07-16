"use client";
import { Button, ButtonGroup, Container, Fab } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { SquareArrowOutUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import MapsDialogsAdd from "./m.dialogs/m.add";
import MapsDialogsShow from "./m.dialogs/m.show";
import MapsDialogDelete from "./m.dialogs/m.delete";

const Maps = dynamic(() => import("../../../components/maps"), {
  ssr: false,
});
export default function MapsFeatures() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-screen flex-col items-center justify-between bg-white dark:bg-black sm:items-start">
        <Maps />
        <MapsDialogsAdd />
        <MapsDialogsShow />
        <MapsDialogDelete />
      </main>
    </div>
  );
}
