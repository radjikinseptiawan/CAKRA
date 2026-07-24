import axios from "axios";
import { BASE_URL } from "./maps.service";

export const getSummaryData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/home`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
