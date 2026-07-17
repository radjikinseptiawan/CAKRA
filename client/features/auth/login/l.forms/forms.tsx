"use client";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { useLoginForms } from "../l.hooks";
import axios from "axios";
import { loginService } from "@/services/accounts.service";
import { LoginSchema } from "@/@types/account.type";
import { useRouter } from "next/navigation";

export default function LoginForms() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useLoginForms();
  const router = useRouter();

  const signIn = async (data: LoginSchema) => {
    const response = await loginService(data);
    if (!response?.data.message) return null;
    router.push("/home");
  };
  return (
    <form
      className="flex flex-col my-5 items-center gap-y-4"
      onSubmit={handleSubmit(signIn)}
    >
      <div>
        <TextField
          label="Username"
          size="small"
          color="success"
          {...register("username", {
            onChange: (e) => {
              e.target.value = e.target.value.toLowerCase();
            },
          })}
          slotProps={{
            input: {
              style: {
                textTransform: "lowercase",
              },
            },
          }}
        />
        {errors && (
          <p className="text-sm text-red-500 text-start">
            {errors.username?.message}
          </p>
        )}
      </div>
      <div>
        <TextField
          color="success"
          type="password"
          label="Password"
          size="small"
          {...register("password")}
        />
        {errors && (
          <p className="text-sm text-red-500 text-start">
            {errors.password?.message}
          </p>
        )}
      </div>
      <Button type="submit" variant="contained" color="success" size="small">
        Masuk
      </Button>

      <Link href={"/register"}>
        Belum punya akun? <span className="text-green-500">klik disini</span>
      </Link>
    </form>
  );
}
