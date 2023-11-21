import axios from "axios";

export const ENDPOINT = "/api";
const BASE_URL = ENDPOINT;

const AxiosUtility = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
});

export const setAuthToken = (instance) => {
  const { state } = JSON.parse(localStorage?.getItem("tiba_connect_user"));
  const token = state?.user?.token;

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default AxiosUtility;