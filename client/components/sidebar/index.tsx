"use client";

import { Button, ButtonGroup, Fab } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { SquareArrowOutDownLeft, SquareArrowOutUpRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { barConfig, barValue } from "../chart/bar";
import { labelBarchart } from "./code";
import { lineValueFunc } from "../chart/line";
import { donutValue, settings } from "../chart/donut";
import { useKotaKab } from "@/context/kota.context";
import StatisticSection from "../statistik";
import DataHistorySection from "../data-history";

export default function Sidebar({
  children,
}: {
  children: ReactNode;
  content?: ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const section = useSearchParams().get("slide");

  const closeSlide = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      router.replace("/");
    } else {
      router.push("?slide=statistik");
    }
  };

  return (
    <>
      <div
        onClick={closeSlide}
        className={`fixed inset-0 z-54 bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {children}

      <div
        className={`fixed top-0 right-0 z-55 h-screen w-96 overflow-visible transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto px-3 bg-white shadow-xl">
          <div className="p-4 text-center font-semibold">
            <ButtonGroup>
              <Button onClick={() => router.push("?slide=statistik")}>
                Statistik
              </Button>
              <Button onClick={() => router.push("?slide=data-history")}>
                Data History
              </Button>
            </ButtonGroup>
            {section == "statistik" ? (
              <StatisticSection />
            ) : (
              <DataHistorySection />
            )}
          </div>
        </div>
      </div>

      <Fab
        color="primary"
        onClick={closeSlide}
        className="!fixed top-10 right-4 !z-[60]"
      >
        {isOpen ? <SquareArrowOutDownLeft /> : <SquareArrowOutUpRight />}
      </Fab>
    </>
  );
}
