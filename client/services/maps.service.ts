import { CameraCCTVType } from "@/@types/camera.type";
import axios from "axios";

/**
 * @description Endpoint untuk mengambil data dari OpenJabar
 *
 */
export const getViolence = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/v1.0/violance`);
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
export const addCamera = async (payload: CameraCCTVType) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/v1.0/cctvs`,
      payload,
    );
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
    const response = await axios.get("http://127.0.0.1:8000/api/v1.0/cctvs");
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const getDetailCamera = async (id: string) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1.0/cctvs/${id}`,
    );
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCamera = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/v1.0/cctvs/${id}`,
    );
    const results = response.data;
    return results;
  } catch (error) {
    console.error(error);
  }
};
