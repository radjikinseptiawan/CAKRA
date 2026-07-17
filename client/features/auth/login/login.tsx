"use client";
import { Paper } from "@mui/material";
import LoginControllers from "./l.controllers/controllers";
import LoginForms from "./l.forms/forms";

export default function LoginFeature() {
  return (
    <LoginControllers>
      <Paper className="px-2 py-3 flex justify-center flex-col text-center w-72 md:w-xl">
        <h1 className="text-xl font-semibold text-green-500">Login</h1>
        <div className="mx-auto my-4">
          <div className="bg-gray-500 w-20 h-20 rounded-full"></div>
        </div>

        <p>Selamat datang kembali.</p>

        <LoginForms />
      </Paper>
    </LoginControllers>
  );
}
