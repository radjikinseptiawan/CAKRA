import { jwtVerify } from "jose";
import "../globals.css";
import "leaflet/dist/leaflet.css";
import Sidebar from "../../components/sidebar";
import ContainerContextClient, { UserTypeJWT } from "../../context/context";
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
  const secret = new TextEncoder().encode(process.env.SECRET_JWT);
  const payload = await jwtVerify(cookie.value, secret);
  if (!payload) return null;

  const result = payload.payload as UserTypeJWT;
  return (
    <ContainerContextClient user={result}>
      <Suspense>
        <Sidebar>{children}</Sidebar>
      </Suspense>
    </ContainerContextClient>
  );
}
