import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "../../components/sidebar";
import ContainerContextClient from "../../context/context";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await (await cookies()).get("access_token");
  if (!cookie) redirect("/");
  return (
    <ContainerContextClient>
      <Suspense>
        <Sidebar>{children}</Sidebar>
      </Suspense>
    </ContainerContextClient>
  );
}
