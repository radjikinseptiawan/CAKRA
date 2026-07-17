import { CameraSchema } from "@/@types/camera.type";
import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BACKEND_LOCAL;

/**
 * @description Endpoint untuk mengambil data dari OpenJabar
 *
 */
export const getViolence = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/violance`);
    const result = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Endpoint untuk menambahkan CCTV
 *
 */
export const addCamera = async (payload: CameraSchema) => {
  try {
    const response = await axios.post(`${BASE_URL}/cctvs`, payload);
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description
 * Endpoin untuk mengambil semua kamera
 */
export const getAllCamera = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cctvs`);
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailCamera = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/cctvs/${id}`);
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCamera = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cctvs/${id}`);
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};
