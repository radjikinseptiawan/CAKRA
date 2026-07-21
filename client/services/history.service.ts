import axios from "axios";
import { BASE_URL } from "./maps.service";

export const getAllHistory = async (page: number | string) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/data-history?page=${page}&limit=20`,
    );
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};
