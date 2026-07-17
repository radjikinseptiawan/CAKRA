"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterAccountSchema } from "./r.forms/schema";

export default function useRegisterForm() {
  return useForm({
    resolver: zodResolver(RegisterAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      fullname: "",
      confirm_password: "",
      password: "",
    },
  });
}
