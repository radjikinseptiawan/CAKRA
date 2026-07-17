"use client";
import { ReactNode } from "react";
import { KotaKabupatenProvider } from "./kota.context";
import { MapProvider } from "./map.context";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme();

export default function ContainerContextClient({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <KotaKabupatenProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MapProvider>{children}</MapProvider>
      </ThemeProvider>
    </KotaKabupatenProvider>
  );
}
