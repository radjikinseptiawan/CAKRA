"use client";
import { Paper } from "@mui/material";
import LoginControllers from "./l.controllers/controllers";
import LoginForms from "./l.forms/forms";
import Image from "next/image";

export default function LoginFeature() {
  return (
    <LoginControllers>
      <Paper className="px-2 py-3 flex justify-center flex-col text-center w-72 md:w-xl">
        <h1 className="text-xl font-semibold text-green-500">Login</h1>
        <div className="mx-auto my-4">
          <Image src={"/CAKRA.png"} alt="cakra.png" width={120} height={120} />
        </div>

        <p>Selamat datang kembali.</p>

        <LoginForms />
      </Paper>
    </LoginControllers>
  );
}
