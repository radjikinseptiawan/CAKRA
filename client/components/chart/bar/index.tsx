import { getViolence } from "@/services/maps.service";
import { KABUPATEN_COORDS } from "../../resources/category.source";
import { useKotaKab } from "@/context/kota.context";

const changeValuetoProperty = Object.keys(KABUPATEN_COORDS);
export const barConfig = {
  data: changeValuetoProperty,
};

export const barValue = () => {
  const { daerah } = useKotaKab();
  return (
    daerah &&
    daerah.map((item) => {
      const years = Object.keys(item.data).sort();
      const latestYears = years[years.length - 1];
      return item.data[latestYears].TOTAL;
    })
  );
};
