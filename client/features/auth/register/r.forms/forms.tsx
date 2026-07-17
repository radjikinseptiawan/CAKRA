"use client";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import useRegisterForm from "../r.hooks";
import { registerService } from "@/services/accounts.service";
import { useRouter } from "next/navigation";
import { useTokenJWT } from "@/context/user.context";

export default function RegisterForms() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useRegisterForm();
  const router = useRouter();
  const payload = async (data: any) => {
    console.log(data);
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
      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
        <div className="text-start">
          <TextField
            {...register("username", {
              onChange: (e) => {
                e.target.value = e.target.value.toLowerCase();
              },
            })}
            label="Username"
            autoComplete="off"
            autoCorrect="off"
            size="small"
            placeholder="johndoe"
            color="success"
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
            autoCorrect="off"
            label="Email"
            size="small"
            placeholder="johndoe@gmail.com"
            type="email"
            color="success"
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
            {...register("number_phone", {
              onChange: (e) => {
                e.target.value = e.target.value.toLowerCase();
              },
            })}
            autoComplete="off"
            autoCorrect="off"
            label="Nomor Telepon"
            size="small"
            placeholder="+62812345678"
            type="text"
            color="success"
            slotProps={{
              input: {
                style: { textTransform: "lowercase" },
              },
            }}
          />
          {errors && (
            <p className="text-sm text-red-500">
              {errors.number_phone?.message}
            </p>
          )}
        </div>

        <div className="text-start">
          <TextField
            {...register("fullname")}
            autoComplete="off"
            label="Nama Lengkap"
            autoCorrect="off"
            size="small"
            color="success"
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
            autoCorrect="off"
            placeholder="*****"
            color="success"
            autoComplete="off"
            type="password"
          />
          {errors && (
            <p className="text-sm text-red-500">{errors.password?.message}</p>
          )}
        </div>
        <div className="text-start">
          <TextField
            color="success"
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
      </div>
      <Button type="submit" color="success" variant="contained" size="small">
        Daftar
      </Button>
      <Link href={"/login"}>
        Sudah punya akun? <span className="text-green-500">klik disini</span>
      </Link>
    </form>
  );
}
