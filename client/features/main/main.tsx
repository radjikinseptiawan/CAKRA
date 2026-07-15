"use client";
import { Button, ButtonGroup, Container, Fab } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { SquareArrowOutUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import MainDialogsAdd from "./m.dialogs/m.add";
import MainDialogsShow from "./m.dialogs/m.show";
import MainDialogDelete from "./m.dialogs/m.delete";

const Maps = dynamic(() => import("../../components/maps"), {
  ssr: false,
});
export default function MainFeatures() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-screen flex-col items-center justify-between  bg-white dark:bg-black sm:items-start">
        <Maps />
        <MainDialogsAdd />
        <MainDialogsShow />
        <MainDialogDelete />
      </main>
    </div>
  );
}
