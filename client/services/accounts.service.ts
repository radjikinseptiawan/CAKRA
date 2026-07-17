import axios from "axios";
import { BASE_URL } from "./maps.service";
import { AccountProfileSchema, LoginSchema } from "@/@types/account.type";

export const allAccountsUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      withCredentials: true,
    });
    const result = response;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registerService = async (body: AccountProfileSchema) => {
  try {
    const response = await axios.post(`${BASE_URL}/account/register`, body);
    const result = response;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const loginService = async (body: LoginSchema) => {
  try {
    const response = await axios.post(`${BASE_URL}/account/login`, body, {
      withCredentials: true,
    });
    const result = response;
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const logoutService = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/account/logout`, {
      withCredentials: true,
    });
    const result = response;
    return result;
  } catch (error) {
    console.log(error);
  }
};
