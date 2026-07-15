"use client";
import { ReactNode } from "react";
import { KotaKabupatenProvider } from "./kota.context";
import { MapProvider } from "./map.context";

export default function ContainerContextClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <KotaKabupatenProvider>
      <MapProvider>{children}</MapProvider>
    </KotaKabupatenProvider>
  );
}
