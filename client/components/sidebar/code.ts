import { barConfig } from "../chart/bar";

export const labelBarchart = [
  {
    scaleType: "band" as const,
    data: barConfig.data ?? [],
  },
];
