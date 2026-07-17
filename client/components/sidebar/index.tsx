"use client";

import {
  Cctv,
  History,
  Home,
  LogOut,
  Map,
  SquareArrowOutDownLeft,
  SquareArrowOutUpRight,
  User,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import Link from "next/link";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
} from "@mui/material";
import { logoutService } from "@/services/accounts.service";

const navigation = [
  {
    icon: <Home />,
    name: "Home",
    href: "/home",
  },
  {
    icon: <Map />,
    name: "Maps",
    href: "/map",
  },
  {
    icon: <User />,
    name: "Users",
    href: "/employee",
  },
  {
    icon: <History />,
    name: "Data History",
    href: "/history",
  },
  {
    icon: <Cctv />,
    name: "Perangkat",
    href: "/device",
  },
];

export default function Sidebar({
  children,
}: {
  children: ReactNode;
  content?: ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const section = useSearchParams().get("slide");
  const pathname = usePathname();
  const closeSlide = () => {
    setIsOpen(!isOpen);
    router.replace(pathname);
  };

  console.log(pathname);
  return (
    <>
      <div
        onClick={closeSlide}
        className={`fixed inset-0 z-54 bg-black/50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {children}

      <div
        className={`fixed top-0 right-0 z-54 mt-4 h-screen w-96 overflow-visible transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto px-3  my-10 bg-white shadow-xl">
          <div className="p-4 text-center font-semibold">
            {navigation.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`${
                    isActive ? "bg-green-600/30" : ""
                  } flex items-center gap-x-2 text-green-600 hover:bg-gray-100 px-2 py-3 my-1 rounded-md cursor-pointer`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <button
              onClick={() => router.push("?action=logout")}
              className={`flex items-center w-full gap-x-2 text-green-600 hover:bg-gray-100 px-2 py-3 my-1 rounded-md cursor-pointer`}
            >
              <LogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <Fab
        color="success"
        onClick={closeSlide}
        className="!fixed bottom-10 right-4 !z-[60]"
      >
        {isOpen ? <SquareArrowOutDownLeft /> : <SquareArrowOutUpRight />}
      </Fab>

      <SignOutDialog />
    </>
  );
}

export const SignOutDialog = () => {
  const action = useSearchParams().get("action");
  const router = useRouter();

  const signOutService = async () => {
    const response = await logoutService();
    if (!response) return null;
    router.push("/");
  };
  return (
    <Dialog className="px-2" open={action ? true : false}>
      <DialogTitle className="font-bold text-green-600">
        Kamu serius?
      </DialogTitle>
      <hr className="text-green-500 mx-5" />
      <DialogContent>
        Aksi ini akan membuat kamu keluar dari halaman, dan perlu login kembali
        untuk mengakses nya
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={() => router.back()}>
          Batal
        </Button>
        <Button onClick={signOutService} variant="contained" color="error">
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
};
