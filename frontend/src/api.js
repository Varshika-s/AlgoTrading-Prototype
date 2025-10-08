import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const fetchPaperTrade = async () => {
  const res = await axios.get(`${BASE_URL}/paper-trade`);
  return res.data;
};

export const fetchTrades = async () => {
  const res = await axios.get(`${BASE_URL}/trades`);
  return res.data.trades;
};
