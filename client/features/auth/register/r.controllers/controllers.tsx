"use client";

import { Container, Paper } from "@mui/material";
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
          <div className="bg-gray-500 w-20 h-20 rounded-full"></div>
        </div>
        <p>Selamat datang di CAKRA.</p>

        {children}
      </Paper>
    </Container>
  );
}
