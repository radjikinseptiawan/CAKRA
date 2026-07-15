import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { barValue } from "../chart/bar";
import { lineValueFunc } from "../chart/line";
import { donutValue, settings } from "../chart/donut";
import { labelBarchart } from "../sidebar/code";

const popperContainer = () =>
  typeof document !== "undefined" ? document.body : undefined;

export default function StatisticSection() {
  const dataValue = barValue();
  const lineValue = lineValueFunc();
  const rawDonutData = donutValue();

  const donutValueDiagram = rawDonutData
    ? Object.entries(rawDonutData)
        .filter(([key]) => key !== "TOTAL")
        .map(([key, value], index) => ({
          id: index,
          value: Number(value),
          label: key,
        }))
    : [];

  const valueBarchart = {
    label: `Jumlah Kasus`,
    data: dataValue ?? [],
  };

  const hasLineData =
    lineValue && lineValue.years.length > 0 && lineValue.values.length > 0;

  return (
    <>
      <p className="text-black my-3">Kasus Kekerasan Jawa Barat per Kota/Kab</p>
      <BarChart
        margin={{ left: 30, right: 12, top: 10, bottom: 10 }}
        xAxis={labelBarchart}
        series={[valueBarchart]}
        width={300}
        height={300}
        slotProps={{
          tooltip: { container: popperContainer() },
        }}
      />

      <p className="text-black my-3">Kasus Kekerasan Jawa Barat per Tahun</p>
      {hasLineData && (
        <LineChart
          xAxis={[
            {
              data: lineValue.years,
              scaleType: "point",
            },
          ]}
          series={[{ data: lineValue.values }]}
          height={300}
          slotProps={{
            tooltip: { container: popperContainer() },
          }}
        />
      )}
      <p className="text-black my-3">Tempat Kejadian Perkara</p>
      <PieChart
        className="mb-12"
        series={[
          {
            innerRadius: 50,
            outerRadius: 100,
            data: donutValueDiagram,
            arcLabel: "value",
          },
        ]}
        {...settings}
        slotProps={{
          tooltip: { container: popperContainer() },
        }}
      />
    </>
  );
}
