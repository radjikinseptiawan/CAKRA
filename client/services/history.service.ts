import axios from "axios";
import { BASE_URL } from "./maps.service";

export const getSearchHistory = async (
  s: string,
  page: number = 1,
  limit: number = 20,
) => {
  try {
    const response = await axios.get(`${BASE_URL}/data-history/search`, {
      params: {
        s,
        page,
        limit,
      },
      withCredentials: true,
    });

    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getAllHistory = async (
  status: string,
  date: string,
  page: string = "1",
) => {
  try {
    const response = await axios.get(`${BASE_URL}/data-history?page=${page}`, {
      params: {
        status,
        date,
      },
      withCredentials: true,
    });
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const updateRejectedStatus = async (id: string) => {
  try {
    const payload = {
      status: "REJECTED",
    };

    const response = await axios.patch(
      `${BASE_URL}/data-history?id=${id}`,
      payload,
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    console.error();
  }
};

export const updateConfirmedStatus = async (id: string) => {
  try {
    const payload = {
      status: "CONFIRMED",
    };
    const response = await axios.patch(
      `${BASE_URL}/data-history?id=${id}`,
      payload,
      { withCredentials: true },
    );
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};
