import axios, { AxiosError } from "axios";
import { baseUrl } from "../config";
import history from "../history";

export const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("JWT"),
  },
};

export const getTasks = async () => {
  const url = `${baseUrl}/tasks/all`;
  console.log("getTasks");
  try {
    const response = await axios.get(url);
    console.log(response.status);

    if (response.status !== 200) {
      alert("Something went wrong");
    }
    return response.data;
  } catch (error: any) {
    const parsedError = error as AxiosError;
    if (parsedError.response?.status === 401) {
      history.push("/login");
      window.location.reload();
    }
  }
};
