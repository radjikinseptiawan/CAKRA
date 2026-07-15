"use client";
import { useKotaKab } from "@/context/kota.context";

export const settings = {
  margin: { right: 5 },
  width: 200,
  height: 200,
  hideLegend: true,
};

export const donutValue = () => {
  const { daerah } = useKotaKab();
  if (!daerah) return null;

  // cari tahun terakhir
  const latestYear = daerah.map((item, index) => {
    const years = Object.keys(item.data);
    const idx = years[years.length - 1];
    return item.data[idx];
  });

  const category = [
    "TOTAL",
    "LAINNYA",
    "LEMBAGA PENDIDIKAN KILAT",
    "RUMAH TANGGA",
    "SEKOLAH",
    "TEMPAT KERJA",
  ];

  const sumAllData = latestYear.reduce(
    (acc, currentObj) => {
      category.forEach((item) => {
        const value = currentObj[item] || 0;
        acc[item] = (acc[item] || 0) + value;
      });

      return acc;
    },
    {} as Record<string, number>,
  );

  return sumAllData;
};
