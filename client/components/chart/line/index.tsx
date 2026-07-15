import { useKotaKab } from "@/context/kota.context";

export const lineValueFunc = () => {
  const { daerah } = useKotaKab();
  if (!daerah) return null;

  const totalPerYear: Record<string, number> = {};

  daerah.forEach((item) => {
    Object.entries(item.data).forEach(([year, value]) => {
      const total = value.TOTAL ?? 0;
      totalPerYear[year] = (totalPerYear[year] ?? 0) + total;
    });
  });

  const years = Object.keys(totalPerYear).sort();
  const values = years.map((year) => totalPerYear[year]);
  return { years, values };
};
