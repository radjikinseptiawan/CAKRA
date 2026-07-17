"use client";
import { Button } from "@mui/material";
import { BabyIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function TopBarNav() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="top-0 fixed flex justify-between items-center  h-14 z-55 bg-white w-full shadow-xl px-1 py-5">
      <div
        className="px-4 flex gap-x-2 items-center"
        onClick={() => router.push("/")}
      >
        <Image src={"/CAKRA.png"} alt="cakra.png" width={80} height={80} />
      </div>
      {pathname == "/" && (
        <Link
          className="mx-4  bg-green-600 px-2 py-1 font-semibold rounded-md text-white"
          href={"/login"}
        >
          Masuk
        </Link>
      )}
    </div>
  );
}
