import axios from "axios";

export const axiosCG = axios.create({
  baseURL: "https://pro-api.coingecko.com/api/v3/",
  headers: {
    'x-cg-pro-api-key': process.env.REACT_APP_COINGECKO_API_KEY,
  },
});
