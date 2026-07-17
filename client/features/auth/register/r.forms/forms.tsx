"use client";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import useRegisterForm from "../r.hooks";
import { registerService } from "@/services/accounts.service";
import { useRouter } from "next/navigation";

export default function RegisterForms() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useRegisterForm();
  const router = useRouter();
  const payload = async (data: any) => {
    const response = await registerService(data);
    if (!response) {
      alert("Gagal mendaftarkan akun");
    }
    router.push("/login");
  };
  return (
    <form
      className="flex flex-col my-5 items-center gap-y-4"
      onSubmit={handleSubmit(payload)}
    >
      <div className="text-start">
        <TextField
          {...register("username", {
            onChange: (e) => {
              e.target.value = e.target.value.toLowerCase();
            },
          })}
          label="Username"
          autoComplete="off"
          size="small"
          placeholder="johndoe"
          type="text"
          slotProps={{
            input: {
              style: { textTransform: "lowercase" },
            },
          }}
        />
        {errors && (
          <p className="text-sm text-red-500">{errors.username?.message}</p>
        )}
      </div>

      <div className="text-start">
        <TextField
          {...register("email", {
            onChange: (e) => {
              e.target.value = e.target.value.toLowerCase();
            },
          })}
          autoComplete="off"
          label="Email"
          size="small"
          placeholder="johndoe@gmail.com"
          type="text"
          slotProps={{
            input: {
              style: { textTransform: "lowercase" },
            },
          }}
        />
        {errors && (
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        )}
      </div>

      <div className="text-start">
        <TextField
          {...register("fullname")}
          autoComplete="off"
          label="Nama Lengkap"
          size="small"
          placeholder="John Doe"
          type="text"
        />
        {errors && (
          <p className="text-sm text-red-500">{errors.fullname?.message}</p>
        )}
      </div>

      <div className="text-start">
        <TextField
          {...register("password")}
          label="Password"
          size="small"
          placeholder="*****"
          autoComplete="off"
          type="password"
        />
        {errors && (
          <p className="text-sm text-red-500">{errors.password?.message}</p>
        )}
      </div>
      <div className="text-start">
        <TextField
          {...register("confirm_password")}
          type="password"
          autoComplete="off"
          label="Confirm Password"
          placeholder="*****"
          size="small"
        />
        {errors && (
          <p className="text-sm text-red-500">
            {errors.confirm_password?.message}
          </p>
        )}
      </div>
      <Button type="submit" variant="contained" size="small">
        Daftar
      </Button>
      <Link href={"/login"}>
        Sudah punya akun? <span className="text-blue-500">klik disini</span>
      </Link>
    </form>
  );
}
