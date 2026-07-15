import MainFeatures from "@/features/main/main";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maps",
};

export default async function Home() {
  return <MainFeatures />;
}
