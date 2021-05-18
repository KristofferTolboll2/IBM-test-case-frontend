import { baseUrl } from "../config";
import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const url = `${baseUrl}/user/login`;
  const response = await axios.post(url, { email, password });
  const { jwtToken } = response.data;
  localStorage.setItem("JWT", jwtToken);
  if (response.status !== 200) {
    return alert("Something went wrong ");
  }
  return response.data;
};
