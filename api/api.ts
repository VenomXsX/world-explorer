import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  timeout: 10000,
  headers: {
    accept: "application/json",
  },
});

export default api;
