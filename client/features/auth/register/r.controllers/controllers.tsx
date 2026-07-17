"use client";

import { Container, Paper } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

export default function RegisterController({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Container className="flex items-center justify-center h-screen max-w-xl">
      <Paper className="px-2 py-3  flex justify-center flex-col text-center w-72 md:w-xl">
        <h1 className="text-xl font-semibold text-green-500">Register</h1>
        <div className="mx-auto my-4">
          <Image src={"/CAKRA.png"} alt="cakra.png" width={120} height={120} />
        </div>
        <p>Selamat datang di CAKRA.</p>

        {children}
      </Paper>
    </Container>
  );
}
