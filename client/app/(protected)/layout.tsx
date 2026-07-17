import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "../../components/sidebar";
import ContainerContextClient from "../../context/context";
import { Suspense } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ContainerContextClient>
      <Suspense>
        <Sidebar>{children}</Sidebar>
      </Suspense>
    </ContainerContextClient>
  );
}
