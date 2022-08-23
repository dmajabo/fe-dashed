import axios from "axios";

export const axiosCC = axios.create({
  baseURL: "https://min-api.cryptocompare.com",
  headers: {
    Authorization: `Apikey ${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`,
  },
});
